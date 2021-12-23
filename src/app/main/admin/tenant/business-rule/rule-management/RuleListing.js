import React, { useEffect } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/main/admin/store/actions/decision-rule.actions';
import * as decisionRuleUtil from '../util/decision-rule.util.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DividerWithText from 'app/common/components/DividerWithText';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { closeDialog, openDialog, openModal } from 'app/store/actions';
import RuleStaticModification from '../rule-management/RuleStaticModification';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const TYPE_CLONE = 'TYPE_CLONE';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      fontSize: '1.4rem',
      color: theme.palette.primary.main
    },
    '& h6': {
      fontSize: '0.875rem',
      fontWeight: 'normal'
    }
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    color: theme.palette.primary.main
  },
  listContextContainer: {
    width: '100%'
  },
  listContainer: {
    width: '100%',
    display: 'flex'
  },
  listTitle: {
    width: '6%'
  },
  heading: {
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  },
  listValue: {
    '& span': {
      color: `${theme.palette.primary.valueTextColor} !important`
    },
    '& b': {
      fontWeight: 'normal'
    }
  }
}));

export default function RuleListing({ parentData }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMounted = useIsMounted();

  const data = useSelector((state) => state.admin.rule.data);
  const user = useSelector(({ auth }) => auth.user);

  if (Array.isArray(data) && data.length > 0) {
    if (data[0].parentId === parentData.id) {
      parentData.isLoaded = true;
      parentData.details = data[0].details;
    }
  }

  const lastestDecisionTable = useSelector(
    (state) => state.admin.rule.lastestDecisionTable
  );

  if (lastestDecisionTable) {
    if (parentData.key === lastestDecisionTable.key) {
      parentData = lastestDecisionTable;
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      if (parentData.id && !parentData.isLoaded) {
        dispatch(Actions.fetchRules(parentData.id));
      }
    }
  }, [isMounted, dispatch, parentData.id, parentData.isLoaded]);

  const handleOpenRuleModification = (event, rowData) => {
    event.preventDefault();
    dispatch(Actions.getRuleDataForModification(rowData));
    dispatch(
      openModal({
        children: <RuleStaticModification />,
        title: 'Rule Modification',
        maxwidth: 'md'
      })
    );
  };

  const handleOpenRuleClone = (event, rowData, type) => {
    event.preventDefault();
    if (rowData) {
      dispatch(
        openDialog({
          maxwidth: 'sm',
          children: (
            <>
              <DialogTitle id="confirmation-dialog-title">
                Do you want to clone the rule: <i>{rowData.display}</i>?
              </DialogTitle>
              <DialogActions>
                <MonarchButton
                  onClick={() => dispatch(closeDialog())}
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  {'Cancel'}
                </MonarchButton>

                <MonarchButton
                  onClick={() => {
                    cloneRule(rowData);
                    dispatch(closeDialog());
                  }}
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  {'Save'}
                </MonarchButton>
              </DialogActions>
            </>
          )
        })
      );
    }
  };

  const cloneRule = (newValue) => {
    if (newValue) {
      const updatedPlayloadInXML = decisionRuleUtil.cloneRule(newValue);
      dispatch(
        Actions.updateDecisionTable(
          user.tenantCode,
          parentData.key,
          updatedPlayloadInXML
        )
      );
    }
  };

  return (
    <>
      <div className={classes.root}>
        <List>
          <ListItem className={classes.heading}>
            <div className={classes.listContainer}>
              <div className={classes.listTitle}>Variable</div>
              <div className={classes.listTitle}>Comparsion</div>
              <div className={classes.listTitle}>Value</div>
            </div>
            <div className="w-auto pr-16">Outcome</div>
            <div className={classes.actionHeaderColumn}></div>
          </ListItem>
          <Divider />
          {parentData.details.map((rowData, aidx) => (
            <>
              <ListItem dense button className="{clsx()}">
                <div
                  className={classes.listContextContainer}
                  onClick={(event) =>
                    handleOpenRuleModification(event, rowData)
                  }
                >
                  <List className="inline-flex">
                    {rowData.expressions.map((row, i) => (
                      <>
                        <ListItem className="p-0 items-start w-auto">
                          <div className={classes.listContainer}>
                            <div className={classes.variableColumn}>
                              <span
                                className={classes.listValue}
                                dangerouslySetInnerHTML={{
                                  __html: decisionRuleUtil.variabbleStyle(
                                    decisionRuleUtil.getTargetAsText(row)
                                  )
                                }}
                              />
                            </div>
                            <div className={classes.comparsionColumn}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: decisionRuleUtil.operatorStyle(
                                    row.operator
                                  )
                                }}
                              />
                            </div>
                            <div className={classes.valueColumn}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: decisionRuleUtil.variabbleStyle(
                                    decisionRuleUtil.getValueAsText(row)
                                  )
                                }}
                              />
                            </div>
                          </div>
                        </ListItem>
                        <div className={classes.andWrapRow}>
                          {i + 1 < rowData.expressions.length && (
                            <div>
                              <span className={classes.content}>and</span>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  </List>
                </div>
                <div className={classes.outcomeColumn}>
                  <div
                    onClick={(event) =>
                      handleOpenRuleModification(event, rowData)
                    }
                  >
                    {rowData.outputEntry}
                  </div>
                </div>
                <div className={classes.actionColumn}>
                  <IconButton
                    onClick={(event) => {
                      handleOpenRuleClone(event, rowData, TYPE_CLONE);
                    }}
                  >
                    <LibraryAdd />
                  </IconButton>
                </div>
              </ListItem>
              {aidx + 1 < parentData.details.length && (
                <DividerWithText>OR</DividerWithText>
              )}
            </>
          ))}
        </List>
      </div>
    </>
  );
}
