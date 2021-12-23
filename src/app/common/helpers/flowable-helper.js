import _ from '@lodash';

class FlowableHelper {
  static dataTypes = {
    boolean: 'boolean',
    radio: 'boolean',
    date: 'date',
    text: 'string',
    number: 'string',
    password: 'string',
    richText: 'string',
    select: 'string',
    stringList: 'string',
    textarea: 'string'
  };

  static buildPayload = (formDef, payload) => {
    let customData = { hasCustomData: false };
    if (payload.customData) {
      customData = {
        name: 'customData',
        type: 'string',
        value: JSON.stringify(payload.customData),
        hasCustomData: true
      };
      delete payload.customData;
    }
    const fields = this.extractFields(formDef.rows);
    const values = this.toSingleArray(payload);
    if (customData.hasCustomData) {
      fields.push({ name: customData.name, type: customData.type });
      values.push({ name: customData.name, value: customData.value });
    }
    return this.mapFieldsAndValues(fields, values);
  };

  static extractFields = (rows) => {
    let fields = [];

    rows.map((row) => {
      row.cols.map((col) => {
        if (this.isValidField(col)) {
          const fieldName = this.getFieldName(col);
          const fieldType = this.getFieldType(col);
          fields.push({
            name: fieldName,
            type: fieldType
          });
        }
        if (
          col.extraSettings &&
          col.extraSettings.layoutDefinition &&
          col.extraSettings.layoutDefinition &&
          col.extraSettings.layoutDefinition.rows
        ) {
          fields = fields.concat(
            this.extractFields(col.extraSettings.layoutDefinition.rows)
          );
        }
        if (
          col.extraSettings &&
          col.extraSettings.sections &&
          col.extraSettings.sections.length
        ) {
          col.extraSettings.sections.map((section) => {
            fields = fields.concat(
              this.extractFields(section.extraSettings.layoutDefinition.rows)
            );
            return section;
          });
        }
        return false;
      });
      return row;
    });

    return fields;
  };

  static toSingleArray = (payload) => {
    if (payload?.parent) {
      delete payload.parent;
    }
    if (payload?.root) {
      delete payload.root;
    }
    if (payload?.task) {
      delete payload.task;
    }

    let fields = [];
    if (Array.isArray(payload)) {
      payload.map((item) => {
        fields = fields.concat(this.toSingleArray(item));
        return item;
      });
    }
    for (let prop in payload) {
      if (payload.hasOwnProperty(prop)) {
        if (
          typeof payload[prop] === 'object' &&
          !(payload[prop] instanceof Date)
        ) {
          fields = fields.concat(this.toSingleArray(payload[prop]));
        } else {
          fields.push({
            name: prop,
            value: payload[prop]
          });
        }
      }
    }

    return fields;
  };

  static mapFieldsAndValues = (fields, values) => {
    const fieldAndValues = [];
    let field;

    values.map((v) => {
      field = fields.filter((f) => {
        return f.name === v.name;
      });
      if (field && field.length) {
        field = field[0];
        fieldAndValues.push({
          name: field.name,
          type: field.type,
          value: this.convertToType(field.type, v.value)
        });
      }
      return false;
    });
    return fieldAndValues;
  };

  static convertToType = (fieldType, fieldValue) => {
    if (fieldType === 'date' && typeof fieldValue !== 'string') {
      return fieldValue.toISOString();
    }
    if (fieldType === 'boolean' && typeof fieldValue !== 'boolean') {
      return fieldValue === 'true' || fieldValue === '1';
    }
    if (fieldType === 'boolean' && typeof fieldValue === 'boolean') {
      return fieldValue === true || fieldValue === 1;
    }
    return '' + fieldValue;
  };

  static isValidField = (col) => {
    return (
      col &&
      col.value &&
      col.type &&
      _.startsWith(col.value, '{{') &&
      _.endsWith(col.value, '}}') &&
      Object.keys(this.dataTypes).join(',').indexOf(col.type) > -1
    );
  };

  static getFieldType = (col) => {
    if (
      col.type === 'select' &&
      col.extraSettings &&
      col.extraSettings.items &&
      col.extraSettings.items.length
    ) {
      let hasBoolean = 0;
      col.extraSettings.items.map((item) => {
        if (item.text.toUpperCase() === 'NO' && item.value === '0') {
          hasBoolean++;
        }
        if (item.text.toUpperCase() === 'YES' && item.value === '1') {
          hasBoolean++;
        }
        return false;
      });
      return hasBoolean === 2 ? 'boolean' : 'string';
    }
    return this.dataTypes[col.type];
  };

  static getFieldName = (col) => {
    let fieldName = col.value
      .replace('{{', '')
      .replace('}}', '')
      .replace(' ', '');
    if (fieldName.indexOf('.') !== -1) {
      fieldName = fieldName.substr(fieldName.lastIndexOf('.') + 1);
    }
    return fieldName;
  };

  static disableForm = (formDef) => {
    formDef.rows.map((row) => {
      if (row.cols) {
        row.cols[0].enabled = false;
      }
      return false;
    });
    return formDef;
  };
}

export default FlowableHelper;
