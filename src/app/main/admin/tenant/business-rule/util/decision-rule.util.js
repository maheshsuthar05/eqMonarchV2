import xml2js from 'react-native-xml2js';
import { v4 as uuidv4 } from 'uuid';
import _ from '@lodash';

export const COMPONENT_TYPE = {
  percentage: 'percentage',
  variable: 'variable',
  days: 'days',
  number: 'numberic',
  multi: 'Multi_select',
  valueInput: 'valueInput',
  subtractionCalculation: 'subtractionCalculation',
  anyOf: 'anyOf'
};

const LIST_MAPPING = {
  fmvAction: [
    {
      label: 'Initial Marketing Plan',
      value: 'initialMarketingPlan'
    },
    {
      label: 'Initial Marketing Plan - Repaired',
      value: 'initialMarketingPlanRepaired'
    },
    {
      label: 'Occupied Marketing Plan',
      value: 'occupiedMarketingPlan'
    },
    {
      label: 'Reduced FMV',
      value: 'reduceFMV'
    },
    {
      label: 'Extend Until',
      value: 'extendUntil'
    },
    {
      label: 'Agent States Offer In Route',
      value: 'agentStatesOfferInRoute'
    },
    {
      label: 'Repairing',
      value: 'repairing'
    },
    {
      label: 'Offer Activity High',
      value: 'offerActivityHigh'
    },
    {
      label: 'Property At Auction',
      value: 'propertyAtAuction'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ],
  offerType: [
    {
      label: 'CONV',
      value: 'conv'
    },
    {
      label: 'CASH',
      value: 'cash'
    },
    {
      label: 'FHA',
      value: 'fha'
    },
    {
      label: 'VA',
      value: 'va'
    },
    {
      label: 'USDA',
      value: 'usda'
    },
    {
      label: 'FHA 203K',
      value: 'fha203k'
    },
    {
      label: 'HARD MONEY',
      value: 'hardMoney'
    },
    {
      label: 'OTHER',
      value: 'other'
    }
  ],
  agentType: [
    {
      label: 'RHSS Agent',
      value: 'rhssAgent'
    },
    {
      label: 'Non-RHSS Agent',
      value: 'nonRhssAgent'
    }
  ],
  repairAction: [
    {
      label: 'Code Violations-HOA Required',
      value: 'codeViloationsHoaRequired'
    },
    {
      label: 'Water Damage',
      value: 'waterDamage'
    },
    {
      label: 'Safety-Hazard',
      value: 'safetyHazard'
    },
    {
      label: 'Lender Required',
      value: 'lenderRequired'
    },
    {
      label: 'Foundation Issue',
      value: 'foundationIssue'
    },
    {
      label: 'Cosmetic-minor remediation',
      value: 'cosmeticMinorRemediation'
    },
    {
      label: 'Cosmetic-paint and carpet',
      value: 'comsmeticPaintAndCarpet'
    },
    {
      label: 'Cosmetic-full scope',
      value: 'comsmeticFullScope'
    },
    {
      label: 'Reap-Tenant',
      value: 'reapTenant'
    },
    {
      label: 'Reap-Tenant required Repair',
      value: 'reapTenantRequiredRepair'
    }
  ],
  strategy: [
    {
      label: 'As Is',
      value: 'asIs'
    },
    {
      label: 'Partial',
      value: 'partial'
    },
    {
      label: 'Repaired',
      value: 'repaired'
    }
  ]
};
const VAIRABLE_MAPPING = {
  currentFMV: 'Current FMV',
  commissionAmount: 'Commission Amount',
  commissionAmountFromSLA: 'From Send Listing Agreement task',
  initialListingDate: 'Initial List Date',
  offerAcceptedDate: 'Offer Accepted within',
  listPrice: 'List Price',
  offer: 'Offer',
  totalCommission: 'Total Commissions',
  buyer: 'Buyer',
  priorOwner: 'Prior Owner',
  FMV: 'FMV',
  lastPriceReduction: 'Last Price Reduction',
  netOffer: 'Net Offer',
  daysListed: 'Days listed',
  purchasePrice: 'Purchased Price',
  finalNetProceed: 'Final Net Proceeds',
  estimatedNetProceed: 'Estimated Net Proceeds',
  preliminaryNetSaleProceed: 'Preliminary Net Sale Proceeds',
  isSupplyEstimatedHudComplete: 'Is Supply Estimated Hud Complete',
  amountOfApproveRepairField: 'Approve Repair in the amount of field',
  repairCost: 'Repair Cost',
  cumulativeApprovedRepairAmount: 'Cumulative Approved Repairs amount',
  numOfRepairBid: 'Number of Reapir Bid',
  originalListDate: 'Original List Date',
  currentListPrice: 'Current List Price',
  updatedListPrice: 'Updated List Price',
  FMVReduction: 'FMV Reduction',
  mostRecentInteriorBPO: 'Most Recent Interior',
  interiorAppraisal: 'Interior Appraisal',
  currentAgentAssignmentDate: 'Current Agent Assignment date',
  agentIncentives: 'Agent Incentives',
  concessions: 'Concessions',
  FMVReductionFromOriginalFMV: 'FMV Reduction from Original FMV',
  priceReduction: 'Price Reduction',
  fairMarketValueChangedByAssetmanager:
    'FairMarket Value Changed By Asset Manager',
  initListPrice: 'Initial List Price',
  highestBid: 'Highest Bid',
  calculatedReservePrice: 'Calculated Reserve Price',
  dom: 'DOM',
  totalCommissionChangedFromDefault:
    'Total Commission $ and/or Total Minimum Commission $ changes',
  numOfAppraisal: 'Num of Appraisals',
  numOfBPO: 'Num of BPO',
  noLRV: 'No LRV',
  fmvAction: 'FMV Action',
  offerType: 'Offer',
  agentType: 'Agent Type',
  repairAction: 'Repair Action',
  totalConcession: 'Total Concessions',
  strategy: 'Strategy',
  repairCategory: 'Repair Category'
};

const isExpression = (expression) => {
  if (expression) {
    const regex = RegExp(/\$\{(.*)\}/g);
    return regex.test(expression);
  }

  return false;
};
export const convertTableDataToDisplay = (tableDatas) => {
  const eText = [];

  tableDatas.map((item) => {
    let itemText = variabbleStyle(item.firstLabel);
    if (item.valueType !== COMPONENT_TYPE.subtractionCalculation) {
      itemText = itemText.concat(' ').concat(operatorStyle(item.operator));
    }
    switch (item.valueType) {
      case COMPONENT_TYPE.percentage:
        itemText = itemText.concat(' ').concat(vauleStyle(item.value, '%'));
        if (item.secondField) {
          itemText = itemText
            .concat(' of ')
            .concat(variabbleStyle(item.secondLabel));
        }
        break;
      case COMPONENT_TYPE.variable:
        itemText = itemText
          .concat(' ')
          .concat(variabbleStyle(item.secondLabel));
        break;
      case COMPONENT_TYPE.days:
        itemText = itemText.concat(' ').concat(vauleStyle(item.value, ' days'));
        if (item.secondField) {
          itemText = itemText
            .concat(' of ')
            .concat(variabbleStyle(item.secondLabel));
        }
        break;
      case COMPONENT_TYPE.number:
        break;
      case COMPONENT_TYPE.multi:
        break;
      case COMPONENT_TYPE.subtractionCalculation:
        if (item.secondField) {
          itemText = itemText
            .concat(' - ')
            .concat(variabbleStyle(item.secondLabel));
          itemText = itemText.concat(' ').concat(operatorStyle(item.operator));
          itemText = itemText.concat(' ').concat(vauleStyle(item.value));
        }
        break;
      case COMPONENT_TYPE.valueInput:
      default:
        itemText = itemText.concat(' ').concat(vauleStyle(item.value));
    }

    eText.push(itemText);
    return false;
  });

  return 'If '.concat(eText.join(" <span style='color: red'>and</span> "));
};

export const variabbleStyle = (name) => {
  return name
    ? "<span style='color: #1979a9'><b>".concat(name).concat('</b></span>')
    : '';
};

export const operatorStyle = (opertaor) => {
  return "<span style='color: red'> <b>".concat(opertaor).concat('</b></span>');
};

export const vauleStyle = (value, afterfix) => {
  let result = " <span style='color: green'><b>".concat(value);

  result = result.concat('</b></span>');

  if (afterfix) {
    result = result.concat(afterfix);
  }
  return result;
};

export const convertExpressionToReadOnly = (expression) => {
  let parsed = removeActitiveTage(expression);

  parsed = parsed.replace('${', '').replace('}', '');

  for (const prop in VAIRABLE_MAPPING) {
    parsed = parsed.replace(prop, VAIRABLE_MAPPING[prop]);
  }

  const percentageVariableMatch = parsed.matchAll(/\((.*)\*(.*)\*(.*)\)/g);

  for (const p of percentageVariableMatch) {
    parsed = parsed.replace(
      p[0],
      calculatePercentage(p[1], p[2]) + '% of ' + p[3]
    );
    break;
  }

  const percentageMatch = parsed.matchAll(/\((.*)\*(.*)\)/g);

  for (const p of percentageMatch) {
    parsed = parsed.replace(p[0], calculatePercentage(p[1], p[2]) + '%');
    break;
  }
  //not equal symbol
  const notEQualSymbol = parsed.matchAll(/ ne /g);
  for (const symbol of notEQualSymbol) {
    parsed = parsed.replace(symbol[0], '<>');
    break;
  }
  //for date
  const matches = parsed.matchAll(
    /util\.getDate\((.*)\)\.isBefore\(util.getDate\((.*)\)\.plusDays\((.*)\)\)/g
  );

  for (const match of matches) {
    parsed = parsed.replace(
      match[0],
      match[1] + ' <= ' + match[3] + ' days of ' + match[2]
    );
    break;
  }
  return parsed;
};

function calculatePercentage(firstInput, seconddInput) {
  return (
    Math.round(
      parseFloat(
        firstInput * seconddInput * Number(100) * Math.pow(10, 2)
      ).toFixed(2)
    ) / Math.pow(10, 2)
  );
}

function parseFieldToName(field) {
  let parsedValue = VAIRABLE_MAPPING[field];

  return parsedValue ? parsedValue : field;
}

export const convertTableDataToExpression = (tableData) => {
  switch (tableData.valueType) {
    case COMPONENT_TYPE.percentage:
      const secondField = tableData.secondField;
      if (secondField) {
        const isConvertedValue = tableData.value.toString().concat('*.01*');
        return '${'
          .concat(tableData.firstField)
          .concat(' ')
          .concat(tableData.operator)
          .concat(' (')
          .concat(isConvertedValue)
          .concat(secondField)
          .concat(')')
          .concat('}');
      } else {
        const isConvertedValue = tableData.value.toString().concat('*.01');
        return '${'
          .concat(tableData.firstField)
          .concat(' ')
          .concat(tableData.operator)
          .concat(' (')
          .concat(isConvertedValue)
          .concat(')')
          .concat('}');
      }

    case COMPONENT_TYPE.days:
      if (tableData.operator === '<=') {
        return '${util.getDate('
          .concat(tableData.firstField)
          .concat(').isBefore(util.getDate(')
          .concat(tableData.secondField)
          .concat(').plusDays(')
          .concat(tableData.value)
          .concat('))')
          .concat('}');
      }
      break;
    case COMPONENT_TYPE.variable: {
      const cOperator = tableData.operator.replace('<>', 'ne');
      return '${'
        .concat(tableData.firstField)
        .concat(' ')
        .concat(cOperator)
        .concat(' ')
        .concat(tableData.secondField)
        .concat('}');
    }
    case COMPONENT_TYPE.valueInput:
      const cOperator = tableData.operator.replace('<>', 'ne');
      return '${'
        .concat(tableData.firstField)
        .concat(' ')
        .concat(cOperator)
        .concat(' ')
        .concat(tableData.value)
        .concat('}');
    case COMPONENT_TYPE.multi:
      break;
    case COMPONENT_TYPE.number:
      break;
    case COMPONENT_TYPE.subtractionCalculation:
      //${finalNetProceed - preliminaryNetSaleProceed != 0
      return '${'
        .concat(tableData.firstField)
        .concat(' - ')
        .concat(tableData.secondField)
        .concat(' ')
        .concat(tableData.operator)
        .concat(' ')
        .concat(tableData.value)
        .concat('}');
    case COMPONENT_TYPE.value:
      return tableData.valueType;
    case COMPONENT_TYPE.anyOf:
      return '${collection:anyOf('
        .concat(tableData.firstField)
        .concat(", '")
        .concat(tableData.value.join(','))
        .concat("')}");
    default:
      break;
  }
};

export const isRuleActive = (express) => {
  let active = true;
  const isActiveMatch = express.matchAll(/\${false *&& */g);

  if (isActiveMatch) {
    active = false;
  }

  return active;
};

export const convertExpressionToTableData = (express, id, originalInput) => {
  let parsed = express;
  var returnObj = {
    dmnExpression: express,
    id: id
  };

  if (!isExpression(express)) {
    returnObj.firstField = originalInput.variable;
    returnObj.firstLabel = parseFieldToName(originalInput.variable);
    returnObj.operator = '=';
    //todo: need to check type
    returnObj.operatorList = ['='];
    returnObj.valueType = COMPONENT_TYPE.valueInput;
    returnObj.value = express;
  } else {
    let isConverted = false;

    //collection, anyof
    const collectionMatch = parsed.matchAll(/collectionanyOf\((.*)\s(.*)\)/g);
    for (const item of collectionMatch) {
      isConverted = true;

      returnObj.firstField = item[1];
      returnObj.firstLabel = parseFieldToName(item[1]);
      returnObj.operator = 'Any Of';
      returnObj.operatorList = ['Any Of'];
      returnObj.valueType = COMPONENT_TYPE.anyOf;
      const mapping = LIST_MAPPING[returnObj.firstField];
      returnObj.valueList = mapping
        ? mapping.sort(function (a, b) {
            return a.label > b.label ? 1 : -1;
          })
        : [];
      returnObj.value = item[2].split(',');
      returnObj.valueLabel = [];

      if (returnObj.value) {
        returnObj.value.map((item) => {
          const foundTarget = _.find(
            returnObj.valueList,
            _.matchesProperty('value', item)
          );
          if (foundTarget) {
            returnObj.valueLabel.push(foundTarget.label);
          }
          return false;
        });
      }

      break;
    }

    //end of date
    if (!isConverted) {
      //for date
      const matches = parsed.matchAll(
        /util\.getDate\((.*)\)\.isBefore\(util.getDate\((.*)\)\.plusDays\((.*)\)\)/g
      );

      for (const match of matches) {
        isConverted = true;

        returnObj.firstField = match[1];
        returnObj.firstLabel = parseFieldToName(match[1]);
        returnObj.secondField = match[2];
        returnObj.secondLabel = parseFieldToName(match[2]);
        returnObj.operator = '<=';
        returnObj.operatorList = ['<='];
        returnObj.valueType = COMPONENT_TYPE.days;
        returnObj.value = match[3];
        returnObj.valueLabel = returnObj.value;
        break;
      }

      if (!isConverted) {
        //percentage ${netOffer < (0*0.01*currentFMV)}
        const percentageVariableMatch = parsed.matchAll(
          /\$\{(.*)\s(.*)\s\((.*)\*(.*)\*(.*)\)\}/g
        );

        for (const p of percentageVariableMatch) {
          isConverted = true;
          const calculatedValue = calculatePercentage(p[3], p[4]);

          returnObj.firstField = p[1];
          returnObj.firstLabel = parseFieldToName(p[1]);
          returnObj.secondField = p[5];
          returnObj.secondLabel = parseFieldToName(p[5]);
          returnObj.operator = p[2];
          returnObj.operatorList = ['>', '<', '<=', '>=', '='];
          returnObj.valueType = COMPONENT_TYPE.percentage;
          returnObj.value = calculatedValue;
          returnObj.valueLabel = returnObj.value;
          break;
        }
      }
      //percentage ${netOffer < (0*0.01)}
      if (!isConverted) {
        const percentageMatch = parsed.matchAll(
          /\$\{(.*)\s(.*)\s\((.*)\*(.*)\)\}/g
        );

        for (const p of percentageMatch) {
          isConverted = true;
          const calculatedValue = calculatePercentage(p[3], p[4]);

          returnObj.firstField = p[1];
          returnObj.firstLabel = parseFieldToName(p[1]);
          returnObj.operator = p[2];
          returnObj.operatorList = ['>', '<', '<=', '>=', '='];
          returnObj.valueType = COMPONENT_TYPE.percentage;
          returnObj.value = calculatedValue;
          returnObj.valueLabel = returnObj.value;
          break;
        }
      }

      //end of percentage
      if (!isConverted) {
        //${finalNetProceed - preliminaryNetSaleProceed != 0}
        const differentCal = parsed.matchAll(
          /\$\{([\S]*)(\s*)(\s*)([\S]*)(\s*)([\S]*)(\s*)([0-9]*)\}/g
        );

        for (const d of differentCal) {
          // const calculatedValue = calculatePercentage(p[3], p[4]);
          isConverted = true;
          returnObj.firstField = d[1];
          returnObj.firstLabel = parseFieldToName(d[1]);
          returnObj.secondField = d[4];
          returnObj.secondLabel = parseFieldToName(returnObj.secondField);
          returnObj.operator = d[6];
          returnObj.operatorList = ['>', '<', '<=', '>=', '=', '!='];
          returnObj.valueType = COMPONENT_TYPE.subtractionCalculation;
          returnObj.value = d[8];
          returnObj.valueLabel = returnObj.value;
          break;
        }
      }

      if (!isConverted) {
        //${commissionAmount ne commissionAmountFromSLA}
        //${variable operator value}
        const comparsion = parsed.matchAll(/\$\{(.*)\s(.*)\s(.*)\}/g);
        for (const com of comparsion) {
          isConverted = true;
          returnObj.firstField = com[1];
          returnObj.firstLabel = parseFieldToName(com[1]);

          const secondField = com[3];
          const variableDisplay = VAIRABLE_MAPPING[secondField];
          if (variableDisplay) {
            returnObj.secondField = secondField;
            returnObj.secondLabel = parseFieldToName(variableDisplay);
            returnObj.operator = com[2].replace('ne', '<>');
            returnObj.operatorList = ['>', '<', '<=', '>=', '=', '<>'];
            returnObj.valueType = COMPONENT_TYPE.variable;
          } else {
            returnObj.operator = com[2].replace('ne', '<>');
            returnObj.operatorList = ['>', '<', '<=', '>=', '=', '<>'];
            returnObj.valueType = COMPONENT_TYPE.valueInput;
            returnObj.value = com[3];
            returnObj.valueLabel = returnObj.value;
          }

          break;
        }
      }
    }
  }

  return returnObj;
};

export const parseDecisionTablePlayload = (playload, parentId) => {
  let parsedData = [];

  let dataInput = { name: '', parentId: parentId };
  dataInput.details = [];
  dataInput.numOfRules = 0;

  if (
    playload &&
    playload.definitions &&
    Array.isArray(playload.definitions.decision)
  ) {
    dataInput.name = playload.definitions['$'].name;
    dataInput.id = playload.definitions['$'].id;

    playload.definitions.decision.map((item) => {
      if (item.decisionTable && Array.isArray(item.decisionTable)) {
        //Collecting the original input
        const originalInput = new Map();

        let originalIdx = 0;
        if (Array.isArray(item.decisionTable[0].input)) {
          item.decisionTable[0].input.map((input) => {
            originalInput[originalIdx] = {
              label: input['$'].label,
              variable: input.inputExpression[0].text[0],
              type: input.inputExpression[0]['$'].typeRef
            };
            originalIdx++;
            return false;
          });
        }
        //end of collecting the original input

        if (Array.isArray(item.decisionTable[0].rule)) {
          dataInput.numOfRules = item.decisionTable[0].rule.length;
          /*
            Convert the rule
          */
          item.decisionTable[0].rule.map((rule) => {
            let detail = { expressions: [] };
            detail.originalRule = rule;
            detail.originalXML = playload;
            detail.key = item['$'].id;
            let currentIdx = 0; //this index is used to find the original input index when the input is not expression
            if (Array.isArray(rule.inputEntry)) {
              let ruleInput = [];
              rule.inputEntry.map((inputEntry) => {
                const inputValue = inputEntry.text[0];
                if (inputValue !== '-') {
                  ruleInput.push(convertExpressionToReadOnly(inputValue));
                  if (detail.isActive !== false) {
                    detail.isActive = isRuleActive(inputValue);
                  }

                  detail.expressions.push(
                    convertExpressionToTableData(
                      inputValue,
                      inputEntry['$'].id,
                      originalInput[currentIdx]
                    )
                  );
                }
                currentIdx++;
                return false;
              });
              if (ruleInput.length > 0) {
                detail.display = 'If ' + ruleInput.join(' and ');
                detail.id = dataInput.details.length;
                dataInput.details.push(detail);
              }
            }

            //parse output, output entry will have one and only one.
            if (
              Array.isArray(rule.outputEntry) &&
              rule.outputEntry.length > 0
            ) {
              const originalOutEntries = rule.outputEntry[0].text;
              if (
                Array.isArray(originalOutEntries) &&
                originalOutEntries.length > 0
              ) {
                const toParsed = originalOutEntries[0];
                const matchedString = toParsed.matchAll(/^"(.*)"$/g);
                detail.outputEntry = toParsed;
                for (const parsed of matchedString) {
                  detail.outputEntry = parsed[1];
                  break;
                }
              }
            }
            return false;
          });
        }
      }
      return false;
    });
  }

  parsedData.push(dataInput);

  return parsedData;
};

export const injectTableDataToPlayload = (tableData, playload) => {
  if (Array.isArray(tableData)) {
    let dataObject = {};

    //convert tableData to map
    tableData.forEach((item) => {
      dataObject[item.id] = item.dmnExpression;
    });

    //insert data to original playload
    if (
      playload &&
      playload.definitions &&
      Array.isArray(playload.definitions.decision)
    ) {
      playload.definitions.decision.map((item) => {
        if (
          item.decisionTable &&
          Array.isArray(item.decisionTable) &&
          Array.isArray(item.decisionTable[0].rule)
        ) {
          item.decisionTable[0].rule.map((rule) => {
            //rule.outputEntries: name
            if (Array.isArray(rule.inputEntry)) {
              rule.inputEntry.map((inputEntry) => {
                const id = inputEntry['$'].id;

                if (dataObject.hasOwnProperty(id)) {
                  inputEntry.text[0] = dataObject[id];
                }

                return false;
              });
            }
            return false;
          });
        }
        return false;
      });
    }
  }
  let builder = new xml2js.Builder({ cdata: true });
  let xml = builder.buildObject(playload);
  return xml;
};

export const cloneRule = (ruleData) => {
  if (ruleData && ruleData.originalXML && ruleData.originalRule) {
    let originalXML = ruleData.originalXML;
    const clonedRule = _.cloneDeep(ruleData.originalRule);
    let originalId = null;

    if (Array.isArray(clonedRule.inputEntry)) {
      originalId = clonedRule.inputEntry[0]['$'].id;
      clonedRule.inputEntry.map((inputEntry) => {
        inputEntry['$'].id = 'inputEntry_'.concat(uuidv4());
        return inputEntry;
      });
    }

    if (Array.isArray(clonedRule.outputEntry)) {
      clonedRule.outputEntry.map((outputEntry) => {
        outputEntry['$'].id = 'outEntry_'.concat(uuidv4());
        return outputEntry;
      });
    }

    if (
      originalXML &&
      originalXML.definitions &&
      Array.isArray(originalXML.definitions.decision)
    ) {
      originalXML.definitions.decision.map((item) => {
        if (
          item.decisionTable &&
          Array.isArray(item.decisionTable) &&
          Array.isArray(item.decisionTable[0].rule)
        ) {
          let insertIdx = 0;
          ruleLoop: for (let rule of item.decisionTable[0].rule) {
            for (let ie of rule.inputEntry) {
              if (ie['$'].id === originalId) {
                break ruleLoop;
              }
            }
            insertIdx++;
          }
          item.decisionTable[0].rule.splice(insertIdx, 0, clonedRule);
        }
        return false;
      });
    }
    let builder = new xml2js.Builder({ cdata: true });
    let xml = builder.buildObject(originalXML);
    return xml;
  }
};

export const injectBooleanToExpression = (expression, activtive) => {
  let updatedExpression = removeActitiveTage(expression);

  if (activtive === false) {
    updatedExpression = updatedExpression.replace('${', '${false && ');
  }

  return updatedExpression;
};

const removeActitiveTage = (expression) => {
  let updatedExpression = _.cloneDeep(expression);
  //remove first true activive
  const trueMatch = updatedExpression.matchAll(/\${true *&& */g);
  for (const item of trueMatch) {
    updatedExpression = updatedExpression.replace(item[0], '${');
    break;
  }
  const falseMatch = updatedExpression.matchAll(/\${false *&& */g);
  for (const item of falseMatch) {
    updatedExpression = updatedExpression.replace(item[0], '${');
    break;
  }

  return updatedExpression;
};

export const getTypeText = (type) => {
  return type === COMPONENT_TYPE.days
    ? 'days'
    : type === COMPONENT_TYPE.percentage
    ? '%'
    : '';
};

export const getTargetAsText = (item) => {
  if (item) {
    switch (item.valueType) {
      case COMPONENT_TYPE.percentage:
        break;
      case COMPONENT_TYPE.variable:
        break;
      case COMPONENT_TYPE.days:
        break;
      case COMPONENT_TYPE.number:
        break;
      case COMPONENT_TYPE.multi:
        break;
      case COMPONENT_TYPE.subtractionCalculation:
        return item.firstLabel.concat(' - ').concat(item.secondLabel);
      case COMPONENT_TYPE.valueInput:
      default:
        return item.firstLabel;
    }
  }

  return item.firstLabel;
};

export const getValueAsText = (item) => {
  if (item) {
    switch (item.valueType) {
      case COMPONENT_TYPE.percentage:
        if (item.secondField) {
          return item.value.toString().concat('% of ').concat(item.secondLabel);
        } else {
          return item.value.toString().concat('%');
        }
      case COMPONENT_TYPE.variable:
        return item.secondLabel;
      case COMPONENT_TYPE.days:
        return item.value
          .toString()
          .concat(' days of ')
          .concat(item.secondLabel);
      case COMPONENT_TYPE.number:
        return item.value;
      case COMPONENT_TYPE.multi:
      case COMPONENT_TYPE.anyOf:
        return item.valueLabel;
      case COMPONENT_TYPE.subtractionCalculation:
        return item.value;
      case COMPONENT_TYPE.valueInput:
      default:
        return item.value;
    }
  }
};
