import { STRING_DATA_TYPE, INT_DATA_TYPE } from '../../constants';
import { Analyzer } from 'type-analyzer';

export function fileDetails(state, action) {
  switch (action.type) {
    case 'CURRENT_FILE':
      return { ...state, curFile: action.payload };
    case 'CURRENT_FILE_SIZE':
      return { ...state, fileSize: action.payload };
    case 'CURRENT_FILE_HEADERS':
      return {
        ...state,
        sourceFileHeaders: action.payload,
      };
    case 'CURRENT_FILE_SAMPLE_ROWS':
      let colMeta = Analyzer.computeColMeta(action.payload.sampleData);
      let arr = action.payload.fileHeaders;
      let validationTemplate = arr.map((e) => {
        let dataTypeObj = colMeta.filter((meta) => meta.key === e);
        let datatype_replace = '';
        if (dataTypeObj.length > 0) {
          datatype_replace = dataTypeObj[0].type;
          if (dataTypeObj[0].type === 'INT' || dataTypeObj[0].type === 'TIME')
            datatype_replace = INT_DATA_TYPE;
        }

        return {
          key: e,
          label: e,
          data_type:
            dataTypeObj.length > 0 ? datatype_replace : STRING_DATA_TYPE,

          is_required: true,
          custom_validation: 'Select ...',
        };
      });
      return {
        ...state,
        initialRows: action.payload.sampleData,
        validationTemplate,
      };
    case 'CURRENT_FILE_TEMPLATE_UPDATE':
      let template = state.validationTemplate;
      let searchKey = action.payload.key;

      let tempObj = template.filter((el) => el.key === searchKey);
      tempObj.length > 0
        ? (tempObj[0][action.payload.key] = action.payload.value)
        : undefined;
      let newArr = [...template];
      return { ...state, validationTemplate: newArr };

    case 'SET_SAAS_LOAD_MAPPER_TEMPLATE':
      return { ...state, curSaasLoadMapperTemplate: action.payload };

    case 'SET_SASS_TEMPLATE_COLUMNS':
      return { ...state, saasTemplateColumns: action.payload };

    case 'SET_SASS_BASE_TEMPLATE_ID':
      return { ...state, baseTemplateId: action.payload };

    case 'SAAS_LOAD_MAPPER_TEMPLATE_UPDATE':
      let rowKey = action.payload.key;
      let saasTemplateColObj = state.saasTemplateColumns.find(
        (el) => el.label === action.payload.label
      );

      if (!saasTemplateColObj) {
        return state;
      }

      let curObj = state.curSaasLoadMapperTemplate.find(
        (el) => el.key === action.payload.key
      );
      Object.keys(saasTemplateColObj).forEach((k, index) => {
        curObj[k] = saasTemplateColObj[k];
      });
      curObj['key'] = rowKey;

      let newSaasloadMapperTemplate = [...state.curSaasLoadMapperTemplate];
      return {
        ...state,
        curSaasLoadMapperTemplate: newSaasloadMapperTemplate,
      };

    default:
      return state;
  }
}
