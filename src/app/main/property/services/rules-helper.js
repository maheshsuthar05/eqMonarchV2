class RulesHelper {
  static getRulesAndInputs = (decisionModel, auditData) => {
    return {
      rules: this.getRules(decisionModel, auditData),
      inputs: this.getInputs(auditData)
    };
  };

  static getRules = (decisionModel, auditData) => {
    const result = {
      rows: [],
      columns: []
    };

    if (
      decisionModel &&
      decisionModel.decisions &&
      decisionModel.decisions.length &&
      auditData
    ) {
      result.columns.push('First');

      const inputs = decisionModel.decisions[0].expression.inputs;
      inputs.map((i) => {
        if (result.columns.indexOf(i.label) === -1) {
          result.columns.push(i.label);
        }
        return false;
      });

      const outputs = decisionModel.decisions[0].expression.outputs;
      outputs.map((o) => {
        if (result.columns.indexOf(o.label) === -1) {
          result.columns.push(o.label);
        }
        return false;
      });

      const rules = decisionModel.decisions[0].expression.rules;

      let count = 0;
      rules.map((rule) => {
        const record = {};

        const data = this.getResults('First', auditData, count);
        record['First'] = {
          id: count + 1,
          text: count + 1,
          result: data.result,
          color: data.color,
          valid: data.valid
        };

        count++;

        rule.inputEntries.map((inputEntry) => {
          const data = this.getResults(inputEntry.inputEntry.id, auditData);
          record[inputEntry.inputClause.label] = {
            id: inputEntry.inputEntry.id,
            text: inputEntry.inputEntry.text,
            result: data.result,
            color: data.color,
            valid: data.valid
          };
          return inputEntry;
        });

        rule.outputEntries.map((outputEntry) => {
          const data = this.getResults(outputEntry.outputEntry.id, auditData);
          record[outputEntry.outputClause.label] = {
            id: outputEntry.outputEntry.id,
            text: outputEntry.outputEntry.text,
            result: data.result,
            color: data.color,
            valid: data.valid
          };
          return outputEntry;
        });

        result.rows.push(record);
        return rule;
      });
    }

    return result;
  };

  static getInputs = (auditData) => {
    const result = [];

    if (auditData && auditData.inputVariables) {
      Object.keys(auditData.inputVariables).map((key) => {
        result.push({
          name: key,
          value: auditData.inputVariables[key]
        });
        return key;
      });
    }

    return result;
  };

  static getResults = (id, auditData, index) => {
    const result = {
      result: null,
      color: '#fff',
      valid: null
    };

    if (auditData.ruleExecutions) {
      let count = 0;
      for (const i in auditData.ruleExecutions) {
        if (auditData.ruleExecutions.hasOwnProperty(i)) {
          if (count === index) {
            result.valid = auditData.ruleExecutions[i].valid ? '1' : '2';
          }
          auditData.ruleExecutions[i].conditionResults.map(
            (conditionResult) => {
              if (conditionResult.id === id) {
                result.result = Boolean(conditionResult.result);
                result.color = result.result ? '#C1E885' : '#F39A9A';
              }
              return false;
            }
          );
          auditData.ruleExecutions[i].conclusionResults.map(
            (conclusionResult) => {
              if (conclusionResult.id === id) {
                result.result = Boolean(conclusionResult.result);
                result.color = result.result ? '#C1E885' : '#F39A9A';
              }
              return false;
            }
          );
        }
        count++;
      }
    }

    return result;
  };
}

export default RulesHelper;
