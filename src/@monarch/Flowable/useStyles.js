import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash'

export const useFormStyles = makeStyles((theme) => ({
  form: {
    '& .flw__data-table .ReactTable .rt-thead.-header': {
      background: theme.palette.primary.main,
      border: 'none'
    },
    '& .flw__data-table .ReactTable .rt-tbody .rt-tr-group': {
      bottomRight: theme.palette.primary.main
    },
    '& .flw__tabs__tab-item--active__button, .flw__tabs__tab-item--active__button:hover': {
      color: `${theme.palette.primary.main} !important`,
      borderBottom: `${theme.palette.primary.SearchTabBorder} !important`
    },
    '& .propertyDetailH5': {
      background: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.contrastText} !important`
    },
    '& .flw__component__html-input p': {
      color: `${theme.palette.primary.main} !important`
    },
    '& .flw__date .react-datepicker__day:hover': {
      backgroundColor: `${theme.palette.primary.main} !important`
    },
    '& .flw__boolean__input:checked': {
      backgroundColor: `${theme.palette.primary.main} !important`
    },
    '& .flw__radio-group__input:checked': {
      backgroundColor: `${theme.palette.primary.main} !important`
    },
    '& .flw__data-table .ReactTable .rt-tbody .rt-td input[type="checkbox"]:checked': {
      backgroundColor: `${theme.palette.primary.main} !important`
    },
    '& .flw__component__button:disabled, .flw__subform__add-button:disabled, .flw__wizard__footer__next:disabled, .flw__wizard__footer__previous:disabled': {
      backgroundColor: `#cccccc !important`
    },
    '& .flw__component__button, .flw__subform__add-button .flw__wizard__footer__next .flw__wizard__footer__previous': {
      backgroundColor: `${theme.palette.primary.main} !important`
    },
    '& .flw__buttongroup__menu > .flw__buttongroup__buttongroup-item > .flw__component button': {
      background: `${theme.palette.primary.main} !important`
    },
    '& .flw__data-table .ReactTable .pagination-bottom': {
      borderTop: 'none'
    },
    '& .icon-Color path': {
      stroke: `${theme.palette.primary.main} !important`
    },
    '& .flw__script-button__button': {
        background: `${theme.palette.primary.main} !important`
    },
    '& .flw__data-table .ReactTable .rt-thead .flw__data-table__header': {
      color: `${theme.palette.primary.contrastText} !important`
    },
    '& .flw__data-table .ReactTable .rt-thead .flw__data-table__header .flw__data-table__header__sortable:hover': {
      color: `${theme.palette.primary.contrastText} !important`
    },
    '& .search_filter .flw__component__button:before': {
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' stroke-linecap='round' stroke-linejoin='round' class='feather feather-filter'%3E%3Cpolygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'%3E%3C/polygon%3E%3C/svg%3E")`
    },
    '& .search_clear .flw__component__button:before': {
      background: `url("data:image/svg+xml,%3Csvg id='Layer_1' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5 c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9 c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z'/%3E%3C/svg%3E");`
    },
    '& .search_submit .flw__component__button:before': {
      background: `url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'%3E%3C!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3Eicon 111 search%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'%3E%3Cg id='icon-111-search' sketch:type='MSArtboardGroup' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' %3E%3Cpath d='M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z' id='search' sketch:type='MSShapeGroup'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`
    },
    '& .export-btn .flw__component__button:before': {
      background: `url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath style='fill:%23ECEFF1;' d='M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224 c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z'/%3E%3Cg%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M336,176.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,176.011,336,176.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M336,240.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,240.011,336,240.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M336,304.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,304.011,336,304.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M336,368.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,368.011,336,368.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M432,176.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,176.011,432,176.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M432,240.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,240.011,432,240.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M432,304.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,304.011,432,304.011z'/%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M432,368.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,368.011,432,368.011z'/%3E%3C/g%3E%3Cpath fill='${_.replace(theme.palette.primary.main, '#', '%23')}' d='M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352 c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68 c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z'/%3E%3Cpath style='fill:%23FAFAFA;' d='M220.032,309.483l-50.592-57.824l51.168-65.792c5.44-6.976,4.16-17.024-2.784-22.464 c-6.944-5.44-16.992-4.16-22.464,2.784l-47.392,60.928l-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504 c-6.656,5.824-7.328,15.936-1.504,22.56l44,50.304L83.36,310.187c-5.44,6.976-4.16,17.024,2.784,22.464 c2.944,2.272,6.432,3.36,9.856,3.36c4.768,0,9.472-2.112,12.64-6.176l40.8-52.48l46.528,53.152 c3.168,3.648,7.584,5.504,12.032,5.504c3.744,0,7.488-1.312,10.528-3.968C225.184,326.219,225.856,316.107,220.032,309.483z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");`
    },
    '& .flw__data-table__top__header--right span.show-filters:after': {
      background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 247.46 247.46' xmlns='http://www.w3.org/2000/svg' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' %3E%3Cpath d='M246.744,13.984c-1.238-2.626-3.881-4.301-6.784-4.301H7.5c-2.903,0-5.545,1.675-6.784,4.301c-1.238,2.626-0.85,5.73,0.997,7.97l89.361,108.384v99.94c0,2.595,1.341,5.005,3.545,6.373c1.208,0.749,2.579,1.127,3.955,1.127c1.137,0,2.278-0.259,3.33-0.78l50.208-24.885c2.551-1.264,4.165-3.863,4.169-6.71l0.098-75.062l89.366-108.388C247.593,19.714,247.982,16.609,246.744,13.984z M143.097,122.873c-1.105,1.34-1.711,3.023-1.713,4.761l-0.096,73.103l-35.213,17.453v-90.546c0-1.741-0.605-3.428-1.713-4.771L23.404,24.682h200.651L143.097,122.873z'/%3E%3C/svg%3E");`
    },
    '& .flw__data-table__top__header--right span.clear-filters:after': {
      background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 247.46 247.46' xmlns='http://www.w3.org/2000/svg' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' %3E%3Cpath d='M246.744,13.984c-1.238-2.626-3.881-4.301-6.784-4.301H7.5c-2.903,0-5.545,1.675-6.784,4.301c-1.238,2.626-0.85,5.73,0.997,7.97l89.361,108.384v99.94c0,2.595,1.341,5.005,3.545,6.373c1.208,0.749,2.579,1.127,3.955,1.127c1.137,0,2.278-0.259,3.33-0.78l50.208-24.885c2.551-1.264,4.165-3.863,4.169-6.71l0.098-75.062l89.366-108.388C247.593,19.714,247.982,16.609,246.744,13.984z M143.097,122.873c-1.105,1.34-1.711,3.023-1.713,4.761l-0.096,73.103l-35.213,17.453v-90.546c0-1.741-0.605-3.428-1.713-4.771L23.404,24.682h200.651L143.097,122.873z'/%3E%3Cline y2='172.167511' x2='173.22998' y1='237.167511' x1='236.22998' stroke-width='10' stroke='%23000'/%3E%3Cline y2='173.167511' x2='236.22998' y1='234.167511' x1='176.22998' stroke-width='10' stroke='%23000'/%3E%3C/svg%3E");`
    },
    '& .flw__data-table .ReactTable .rt-thead .rt-th .flw__data-table__header__sortable:after': {
      background: `url("data:image/svg+xml,%3Csvg width='21' height='9' viewBox='0 0 21 9' xmlns='http://www.w3.org/2000/svg' fill='${_.replace(theme.palette.primary.contrastText, '#', '%23')}' %3E%3Cpath d='m6.5,4 4-4 4,4zm0,1 4,4 4-4z' /%3E%3C/svg%3E");`
    },
    '& .flw__data-table .ReactTable .rt-thead .rt-th.-sort-asc .flw__data-table__header__sortable:after': {
      background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' ratio='1'%3E%3Cpolygon fill='${_.replace(theme.palette.primary.contrastText, '#', '%23')}' points='5 13 10 8 15 13'%3E%3C/polygon%3E%3C/svg%3E");`
    },
    '& .flw-loading-bar:before, .flw__data-table .-loading:before': {
      background: `${theme.palette.primary.main} !important`
    },
    '& .dataTranferMultiSelect .dataTranferLeft .ReactTable .rt-tbody':{
      overflow: `inherit`
    },
    '& .dataTranferMultiSelect .flw__data-table .ReactTable': {
      paddingLeft: `0`
    },
    '& .flw__component__html-input': {
      textOverflow: `ellipsis`,
      overflow: `hidden`
    },
    '& div.flw__select__menu': {
      border: `1px solid ${theme.palette.primary.main}`
    },
    '& div.flw__select__control--is-focused, div.flw__select__control--is-focused:hover': {
      border: `1px solid ${theme.palette.primary.main}`
    },
    '& div.flw__panel--showBorder__content-wrapper': {
      border: `1px solid ${theme.palette.primary.main}`
    },
    '& div.flw__select__multi-value, div.flw__select__multi-value__remove:hover': {
      background: `${theme.palette.primary.main} !important`,
    },
    '& .one-view-read-only-fields table thead': {
      background: `${theme.palette.primary.main} !important`,
    },
    '& .flw__richText .flw__richText__input:not(.flw__richText--disabled__input):hover': {
      border: `1px solid ${theme.palette.primary.main} !important`
    },
    '& div.flw__select__multi-value--is-disabled .flw__select__multi-value__label': {
      color: `${theme.palette.primary.widgetTitleColor}`,
    },
    '& .task-date-range': {
      marginTop: '25px'
    },
    '& .task-date-range__body': {
      width: '95% !important'
    },
    '& .task-date-range .flw__script-button__button': {
      background: 'none !important',
      boxShadow: 'none !important',
      color: `${theme.palette.primary.main}!important`,
      textDecoration: 'underline',
      padding: '0',
      fontSize: '12px !important'
    },
    '& .task-date-range .flw__script-button__button:focused, .task-date-range .flw__script-button__button:hover': {
      background: 'none !important',
      boxShadow: 'none !important',
      color: `${theme.palette.primary.main}!important`,
    },
    '& .flw__data-table .ReactTable .rt-thead .rt-resizable-header-content':{
      overflow: 'initial'
    },
    '& .vendor-account-services .flw__subform__add-button:before': {
      background: `url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 55 55' fill='${_.replace(theme.palette.primary.main, '#', '%23')}' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M49,8.5v-8H0v47h7v7h48v-46H49z M2,45.5v-43h45v6H7v37H2z M53,52.5H9v-5v-37h40h4V52.5z'/%3E%3Cpath d='M42,30.5H32v-10c0-0.553-0.447-1-1-1s-1,0.447-1,1v10H20c-0.553,0-1,0.447-1,1s0.447,1,1,1h10v10c0,0.553,0.447,1,1,1 s1-0.447,1-1v-10h10c0.553,0,1-0.447,1-1S42.553,30.5,42,30.5z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");`
    },
    '& .vendor-account-services .flw__subform-instance--show-delete-button__delete-button': {
      border: `${theme.palette.primary.SearchTabBorder} !important`
    },
    '& .vendor-account-services .flw__container__body': {
      border: `${theme.palette.primary.SearchTabBorder} !important`
    },
    '& .vendor-account-services .flw__subform-instance--show-delete-button__delete-button:before': {
      background: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg' ratio='1'%3E%3Cline stroke='${_.replace(theme.palette.primary.main, '#', '%23')}' stroke-width='1.1' x1='1' y1='1' x2='13' y2='13'%3E%3C/line%3E%3Cline stroke='${_.replace(theme.palette.primary.main, '#', '%23')}' stroke-width='1.1' x1='13' y1='1' x2='1' y2='13'%3E%3C/line%3E%3C/svg%3E");`
    },
    '& .property-layout-column .flw__panel__label span': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));







