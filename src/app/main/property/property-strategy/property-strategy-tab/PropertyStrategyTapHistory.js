import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  getPropertyProjections,
  setHistoryValue,
  getProjectionsListAction
} from 'app/main/property/store/actions';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const PropertyStrategyTapHistory = () => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({});
  const caseInstanceId = routeParams.caseInstanceId;
  const projectionsList = useSelector(
    ({ property }) => property.strategy.projectionsList
  );

  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );
  useEffect(() => {
    if (
      hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Strategy_History_API_CALL
      )
    ) {
      dispatch(getProjectionsListAction(caseInstanceId));
    }
  }, [dispatch, caseInstanceId, contextResources]);

  let projections = [];
  if (projectionsList.length !== 0) {
    projections = projectionsList.map((res, inx) => {
      let altDate = new Date(Date.parse(res.createdDate));
      if (inx === 0) {
        return {
          ...res,
          createdDate: 'Recent Record',
          updateAction: 'old'
        };
      }
      return {
        ...res,
        createdDate: altDate.toLocaleString(),
        updateAction: 'old'
      };
    });
  }

  const onchangeValue = (selectValue) => {
    if (selectValue === null) {
      setInputValue({});
      document
        .getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
        .click();
      dispatch(
        getPropertyProjections(
          '',
          projections[0].propertyProjectionsId,
          'history'
        )
      );
      dispatch(
        setHistoryValue({
          propertyProjectionsId: projections[0].propertyProjectionsId,
          flag: '',
          updateAction: 'new'
        })
      );
      return;
    }
    const { propertyProjectionsId, updateAction } = selectValue;
    setInputValue(selectValue);
    dispatch(getPropertyProjections('', propertyProjectionsId, 'history'));
    dispatch(
      setHistoryValue({ propertyProjectionsId, flag: 'history', updateAction })
    );
  };

  if (projections.length > 1) {
    return (
      <>
        <Autocomplete
          id="combo-box-demo"
          onChange={(e, value) => onchangeValue(value)}
          key={false}
          options={projections}
          getOptionLabel={(option) => option.createdDate}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="History" />}
        />
        <Button
          className="ml-12"
          onClick={() => onchangeValue(null)}
          color="primary"
          variant="contained"
          disabled={Object.keys(inputValue).length === 0 ? true : false}
        >
          {'RESET'}
        </Button>
      </>
    );
  }
  return null;
};

export default PropertyStrategyTapHistory;
