import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as Actions from '../store/actions';
import history from '@history';
import { _cookies, navigationStart } from 'app/store/actions';
import { famService } from 'app/services/fam/fam.service';
import { forgerock } from 'app/config/api';
import _ from '@lodash';
import { AggregatorService } from 'app/services/auth0Service/aggregator';

function* postUserToFAM(args) {
  try {
    const parentPartyId =
      args.userType === 'vendorunverified'
        ? yield vendorVerificationProcess(args)
        : yield agentVerificationProcess(args);

    const payload = yield {
      userId: _cookies.getCookies(forgerock.cookie.userName),
      userType: _cookies.getCookies(forgerock.cookie.userType),
      vendorAgentCode:
        args.payload[0].userType === 'Vendor'
          ? args.payload[0].vendorCompanyName
          : _cookies.getCookies(forgerock.cookie.userName),
      categories: [], //categories.response], This code is deprecated
      isAgentVendorAdmin: true,
      vendorid: parentPartyId
    };
    yield call(famService.register, payload);

    yield all([
      put({
        type: 'API_CALL_SUCCESS',
        message: 'User Information updated Succesfully'
      }),
      put(navigationStart(history, `/verification/successful`))
    ]);
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'User Information updated failed',
      atAction: Actions.POST_USER_TO_FAM,
      showError: true
    });
    yield put(navigationStart(history, `/logout`));
  }
}

function* agentVerificationProcess(args) {
  try {
    const rolesPayload = yield all(
      _.map(args.payload[0].roleType.partyRoleType, (data, sequenceNumber) => ({
        partyRoleType: data,
        activeIndicator: 1,
        sequenceNumber,
        licenses: [
          {
            licenseExpirationDate: args.payload[0].licenseExpirationDate,
            licenseIdentifier: args.payload[0].licenseId,
            licenseIssuingAuthorityStateName:
              args.payload[0].licenseIssuingAuthorityStateName,
            sequenceNumber: sequenceNumber
          }
        ]
      }))
    );

    const roles = yield _.uniqBy(rolesPayload, 'partyRoleType');

    const agentParentPayload = yield {
      operation: 'INSERT',
      roles,
      eqvmVendors: [
        {
          primaryIndicator: 1,
          activeIndicator: 1,
          billingType: 'CreditCard'
        }
      ],
      party: {
        legalEntityFullName: _cookies.getCookies(forgerock.cookie.userName)
      }
    };

    const parentParty = yield call(AggregatorService.post, agentParentPayload);

    return parentParty.party.partyId;
  } catch (error) {
    return error;
  }
}

function* vendorVerificationProcess(args) {
  try {
    const rolesPayload = yield all(
      _.map(args.payload[0].eqvmProductCategories, (data, sequenceNumber) => ({
        partyRoleType: data.productCategoryId.partyRoleType,
        activeIndicator: 1,
        sequenceNumber
      }))
    );

    const roles = yield _.uniqBy(rolesPayload, 'partyRoleType');

    const vendorParentPayload = yield {
      operation: 'INSERT',
      roles,
      eqvmVendors: [
        {
          dunsNumber: args.payload[0].eqvmVendors.dunsNumber,
          primaryIndicator: 1,
          activeIndicator: 1,
          billingType: 'CreditCard'
        }
      ],
      party: {
        legalEntityFullName: args.payload[0]?.vendorCompanyName
      }
    };

    const parentParty = yield call(AggregatorService.post, vendorParentPayload);

    const adminPayload = {
      operation: 'INSERT',
      party: {
        individualFirstName: _cookies.getCookies(forgerock.cookie.firstname),
        individualLastName: _cookies.getCookies(forgerock.cookie.lastname),
        individualFullName: _cookies.getCookies(forgerock.cookie.displayName),
        userId: _cookies.getCookies(forgerock.cookie.userName),
        emailAddress: _cookies.getCookies(forgerock.cookie.userEmail),
        parentPartyId: parentParty.party.partyId
      },
      roles
    };

    //const adminParty =
    yield call(AggregatorService.post, adminPayload);

    const currentVendorPartyPayload = yield call(AggregatorService.post, {
      operation: 'FETCH',
      party: {
        partyId: parentParty.party.partyId,
        roles: [{}]
      }
    });

    const eqvmVendorProducts = [];
    yield all(
      _.map(args.payload[0].eqvmProductCategories, (category) => {
        _.map(category.eqvmProducts, (productId) => {
          const data = {
            activeIndicator: 1,
            productId,
            vendorId: parentParty.party.eqvmVendors[0].vendorId,
            eqvmVendorServiceAreas: [
              {
                activeIndicator: 1,
                serviceAreaCity: category?.serviceAreaCity
                  ? category?.serviceAreaCity
                  : null,
                serviceAreaStateCode: category?.serviceAreaStateCode
                  ? category?.serviceAreaStateCode
                  : null,
                serviceAreaZip: category?.serviceAreaZip
                  ? category?.serviceAreaZip
                  : null,
                serviceAreaNationwideIndicator:
                  category?.eqvmVendorServiceAreas === 'Nationwide'
                    ? true
                    : false
              }
            ]
          };
          _.map(currentVendorPartyPayload.party.roles, (role) => {
            if (
              category.productCategoryId.partyRoleType === role.partyRoleType
            ) {
              data.roleId = role.roleId;
            }
          });
          return eqvmVendorProducts.push(data);
        });
      })
    );

    yield call(AggregatorService.post, {
      operation: 'BULK_INSERT',
      eqvmVendorProducts: eqvmVendorProducts
    });

    return parentParty.party.partyId;
  } catch (e) {
    return e;
  }
}

function* verificationWatcher() {
  yield takeLatest(Actions.POST_USER_TO_FAM, postUserToFAM);
}

export default verificationWatcher;
