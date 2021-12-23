import { skyBlue } from '@fuse/colors';
import { lightBlue, red } from '@material-ui/core/colors';

const themesConfig = {
  default: {
    palette: {
      type: 'light',
      primary: {
        light: '#3f9bff',
        main: '#00769b',
        dark: '#2862a1',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #00769b'
      },
      secondary: {
        light: lightBlue[400],
        main: '#f8971d',
        dark: lightBlue[700],
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#00769b', //0c1a82
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FFFFFF', //e6e6f4
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#00769b',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#00769b', //0c1a82
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#f6fbff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #00769b',
      flatWidgetBdr: '12px solid #00769b'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920, //1920
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#00769b',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    },
  },
  defaultDark: {
    palette: {
      type: 'dark',
      primary: {
        light: '#3f9bff',
        main: '#24588b',
        dark: '#2862a1',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #24588b'
      },
      secondary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900],
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#1e2125',
        default: '#121212',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#24588b',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#24588b',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#dceeff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #24588b',
      flatWidgetBdr: '12px solid #24588b'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#0c1a82',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  legacy: {
    palette: {
      type: 'light',
      primary: {
        light: '#3f9bff',
        main: '#0c1a82',
        dark: '#2862a1',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #0c1a82'
      },
      secondary: {
        light: lightBlue[400],
        main: '#f8971d',
        dark: lightBlue[700],
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#0c1a82',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#e6e6f4',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#0c1a82',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#0c1a82',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#dce0ff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #0c1a82',
      flatWidgetBdr: '12px solid #0c1a82'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#0c1a82',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light1: {
    palette: {
      type: 'light',
      primary: {
        light: '#b3d1d1',
        main: '#006565',
        dark: '#003737',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #006565'
      },
      secondary: {
        light: '#ffecc0',
        main: '#FFBE2C',
        dark: '#ff9910',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#006565',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#F0F7F7',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#006565',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#006565',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#F0F7F7',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #006565',
      flatWidgetBdr: '12px solid #006565'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#006565',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light2: {
    palette: {
      type: 'light',
      primary: {
        light: '#fdf3da',
        main: '#f8d683',
        dark: '#f3bc53',
        contrastText: '#000',
        contrastDark: '#000',
        widgetTitleColor: '#000000',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #f8d683'
      },
      secondary: {
        light: '#FADCB3',
        main: '#F3B25F',
        dark: '#ec9339',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#f8d683',
            color: {
              active: '#f8971d',
              inactive: '#000'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#000'
              }
            },
            contrastText: '#000',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FFFFFF',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#f8d683',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#f8d683',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#fef5e0',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #f8d683',
      flatWidgetBdr: '12px solid #f8d683'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#f3b25f',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light3: {
    palette: {
      type: 'light',
      primary: {
        light: '#D9C8CE',
        main: '#80485B',
        dark: '#50212F',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #80485B'
      },
      secondary: {
        light: '#FFE3BF',
        main: '#FFB049',
        dark: '#FF8619',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#80485b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FAFAFE',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#80485b',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#80485b',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#faf0f3',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #80485b',
      flatWidgetBdr: '12px solid #80485b'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#80485b',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light4: {
    palette: {
      type: 'light',
      primary: {
        light: '#CDCCE8',
        main: '#5854B1',
        dark: '#2D2988',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #5854B1'
      },
      secondary: {
        light: '#F8EBF2',
        main: '#E7BDD3',
        dark: '#D798B7',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#5854b1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#F6F7FB',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#5854b1',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#5854b1',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#edecff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #5854b1',
      flatWidgetBdr: '12px solid #5854b1'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#5854b1',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light5: {
    palette: {
      type: 'light',
      primary: {
        light: '#C2C7F1',
        main: '#3543D0',
        dark: '#161EB3',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #3543D0'
      },
      secondary: {
        light: '#B3F1FE',
        main: '#00CFFD',
        dark: '#00B2FC',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#3543d0',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#F7FAFF',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#3543d0',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#3543d0',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#eaecff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #3543d0',
      flatWidgetBdr: '12px solid #3543d0'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#3543d0',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light6: {
    palette: {
      type: 'light',
      primary: {
        light: '#BBE2DA',
        main: '#1B9E85',
        dark: '#087055',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #1B9E85'
      },
      secondary: {
        light: '#FFD0C1',
        main: '#FF6231',
        dark: '#FF3413',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#1b9e85',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#F2F8F1',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#1b9e85',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#1b9e85',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#F2F8F1',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #1b9e85',
      flatWidgetBdr: '12px solid #1b9e85'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#1b9e85',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light7: {
    palette: {
      type: 'light',
      primary: {
        light: '#BFC4E6',
        main: '#2A3BAB',
        dark: '#0F1980',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #2A3BAB'
      },
      secondary: {
        light: '#C2ECF0',
        main: '#33C1CD',
        dark: '#149EAE',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2a3bab',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#EDF0F6',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#2a3bab',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#2a3bab',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#eaedff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #2a3bab',
      flatWidgetBdr: '12px solid #2a3bab'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#2a3bab',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light8: {
    palette: {
      type: 'light',
      primary: {
        light: '#D2EFF2',
        main: '#17b4ca',
        dark: '#3AA7BA',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #17b4ca'
      },
      secondary: {
        light: '#FFF2C6',
        main: '#FED441',
        dark: '#FDB91C',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#17b4ca',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FFFFFF',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#17b4ca',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#17b4ca',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#d7f4f7',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #17b4ca',
      flatWidgetBdr: '12px solid #17b4ca'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#17b4ca',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light9: {
    palette: {
      type: 'light',
      primary: {
        light: '#D3C0CD',
        main: '#6B2C57',
        dark: '#3C102C',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #6B2C57'
      },
      secondary: {
        light: '#FDEAC9',
        main: '#F9B84B',
        dark: '#F59123',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#6b2c57',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FAFAFE',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#6b2c57',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#6b2c57',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#fff5fc',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #6b2c57',
      flatWidgetBdr: '12px solid #6b2c57'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#6b2c57',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light10: {
    palette: {
      type: 'light',
      primary: {
        light: '#C6C9CD',
        main: '#404B57',
        dark: '#1C232C',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #404B57'
      },
      secondary: {
        light: '#FEEDC7',
        main: '#FCC344',
        dark: '#FAA11F',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#404b57',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#F5F4F6',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#404b57',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#404b57',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e4e5e7',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #404b57',
      flatWidgetBdr: '12px solid #404b57'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#404b57',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light11: {
    palette: {
      type: 'light',
      primary: {
        light: '#C4C4C4',
        main: '#3A3A3A',
        dark: '#181818',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #3A3A3A'
      },
      secondary: {
        light: '#EFEFED',
        main: '#CBCAC3',
        dark: '#ACABA1',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#3a3a3a',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FAF8F2',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#3a3a3a',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#3a3a3a',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#ededed',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #3a3a3a',
      flatWidgetBdr: '12px solid #3a3a3a'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#3a3a3a',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  light12: {
    palette: {
      type: 'light',
      primary: {
        light: '#FFFAF6',
        main: '#FFEDE2',
        dark: '#FFE0CF',
        contrastText: '#000',
        contrastDark: '#000',
        widgetTitleColor: '#000000',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #FFEDE2'
      },
      secondary: {
        light: '#DBD8F7',
        main: '#887CE3',
        dark: '#584CD0',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#ffede2',
            color: {
              active: '#f8971d',
              inactive: '#000'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#000',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#FFFFFF',
        default: '#FCF8F5',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#ffede2',
        iconbg: '#FFFFFF',
        contrastText: '#000000',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#ffede2',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#FCF8F5',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #ffede2',
      flatWidgetBdr: '12px solid #ffede2'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#ffede2',
      color: '#000000',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark1: {
    palette: {
      type: 'dark',
      primary: {
        light: '#C2C2C3',
        main: '#323338',
        dark: '#131417',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #323338'
      },
      secondary: {
        light: '#B8E1D9',
        main: '#129B7F',
        dark: '#056D4F',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#323338',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#262526',
        default: '#1E1D1E',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#323338',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#323338',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e7e7e7',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #323338',
      flatWidgetBdr: '12px solid #323338'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#323338',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark2: {
    palette: {
      type: 'dark',
      primary: {
        light: '#C9CACE',
        main: '#4B4F5A',
        dark: '#23262E',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #4B4F5A'
      },
      secondary: {
        light: '#F8F5F2',
        main: '#E6DED5',
        dark: '#D5C8BA',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#4b4f5a',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#31343E',
        default: '#2A2D35',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#4b4f5a',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#4b4f5a',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e9e9e9',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #4b4f5a',
      flatWidgetBdr: '12px solid #4b4f5a'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#4b4f5a',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark3: {
    palette: {
      type: 'dark',
      primary: {
        light: '#C2C8D2',
        main: '#354968',
        dark: '#16213A',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #354968'
      },
      secondary: {
        light: '#F4CFCA',
        main: '#D55847',
        dark: '#C03325',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#354968',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#23354E',
        default: '#1B2A3F',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#354968',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#354968',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#dbe6f5',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #354968',
      flatWidgetBdr: '12px solid #354968'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#354968',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark4: {
    palette: {
      type: 'dark',
      primary: {
        light: '#CECADF',
        main: '#5A4E93',
        dark: '#2E2564',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #5A4E93'
      },
      secondary: {
        light: '#B3EBD6',
        main: '#00BC77',
        dark: '#009747',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#5a4e93',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#22184B',
        default: '#180F3D',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#5a4e93',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#5a4e93',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#ece8ff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #5a4e93',
      flatWidgetBdr: '12px solid #5a4e93'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#5a4e93',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark5: {
    palette: {
      type: 'dark',
      primary: {
        light: '#CCD7E2',
        main: '#56789D',
        dark: '#2B486F',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #56789D'
      },
      secondary: {
        light: '#D7D3ED',
        main: '#796CC4',
        dark: '#493DA2',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#56789d',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#465261',
        default: '#232931',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#56789d',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#56789d',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e1edfa',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #56789d',
      flatWidgetBdr: '12px solid #56789d'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#56789d',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark6: {
    palette: {
      type: 'dark',
      primary: {
        light: '#FFC7CE',
        main: '#FF445D',
        dark: '#FF1F30',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #FF445D'
      },
      secondary: {
        light: '#B4E3FB',
        main: '#05A2F3',
        dark: '#0175EA',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#ff445d',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#2F3438',
        default: '#25292E',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#ff445d',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#ff445d',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#ffecef',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #ff445d',
      flatWidgetBdr: '12px solid #ff445d'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#ff445d',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark7: {
    palette: {
      type: 'dark',
      primary: {
        light: 'FFECC5',
        main: '#FEBE3E',
        dark: '#FD991B',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #FEBE3E'
      },
      secondary: {
        light: '#FFC8C7',
        main: '#FE4644',
        dark: '#FD201F',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#febe3e',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#2A2E32',
        default: '#212529',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#febe3e',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#febe3e',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#fff5e0',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #febe3e',
      flatWidgetBdr: '12px solid #febe3e'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#febe3e',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark8: {
    palette: {
      type: 'dark',
      primary: {
        light: '#BEBFC8',
        main: '#252949',
        dark: '#0D0F21',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #252949'
      },
      secondary: {
        light: '#CBD7FE',
        main: '#5079FC',
        dark: '#2749FA',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#252949',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#2D3159',
        default: '#202441',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#252949',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#252949',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#dee2ff',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #252949',
      flatWidgetBdr: '12px solid #252949'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#252949',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark9: {
    palette: {
      type: 'dark',
      primary: {
        light: '#BCC8CD',
        main: '#204657',
        dark: '#0B202C',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #204657'
      },
      secondary: {
        light: '#B3EBC5',
        main: '#00BD3E',
        dark: '#00981B',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#204657',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#1C1E27',
        default: '#15171E',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#204657',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#204657',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e3f1f7',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #204657',
      flatWidgetBdr: '12px solid #204657'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#204657',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark10: {
    palette: {
      type: 'dark',
      primary: {
        light: '#C3C2D2',
        main: '#36336A',
        dark: '#16143C',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #36336A'
      },
      secondary: {
        light: '#D6CEFC',
        main: '#765CF5',
        dark: '#4630EE',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#36336a',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#2D2A5D',
        default: '#26244E',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#36336a',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#36336a',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#e1dffe',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #36336a',
      flatWidgetBdr: '12px solid #36336a'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#36336a',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark11: {
    palette: {
      type: 'dark',
      primary: {
        light: '#BFB7BF',
        main: '#2A0F29',
        dark: '#0F040F',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #2A0F29'
      },
      secondary: {
        light: '#D9B9C3',
        main: '#801737',
        dark: '#500716',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2a0f29',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#200D1F',
        default: '#2D132C',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#2a0f29',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#2a0f29',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#f5e9f5',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #2a0f29',
      flatWidgetBdr: '12px solid #2a0f29'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#2a0f29',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  },
  dark12: {
    palette: {
      type: 'dark',
      primary: {
        light: '#CCC3C8',
        main: '#543847',
        dark: '#291720',
        contrastText: '#fff',
        contrastDark: '#000',
        widgetTitleColor: '#ffffff',
        cardTitleColor: '#ffffff',
        tabSelectedTextColor: '#000000de',
        labelTextColor: '#000000',
        valueTextColor: '#666666',
        SearchTabBorder: '2px solid #543847'
      },
      secondary: {
        light: '#DFB8BD',
        main: '#BE717A',
        dark: '#99424A',
        contrastText: '#000'
      },
      navigation: {
        vertical: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#2862a1',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        },
        horizontal: {
          primary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#543847',
            color: {
              active: '#f8971d',
              inactive: '#fff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 0
          },
          secondary: {
            height: {
              min: 50,
              max: 50,
              default: 50
            },
            width: {
              min: 280,
              max: 280,
              default: 280
            },
            background: '#24588b',
            color: {
              active: '#f8971d',
              inactive: '#fff',
              widgettitleColor: '#ffffff'
            },
            icon: {
              color: {
                active: '#f8971d',
                inactive: '#fff'
              }
            },
            contrastText: '#fff'
          }
        }
      },
      contentTiles: {
        height: {
          min: '33rem',
          max: '33rem',
          height: '100%'
        },
        boxShadow: 4
      },
      background: {
        primary: '#24588b',
        paper: '#4D4351',
        default: '#27141F',
        navbar: '#24588b',
        topDropdowntxt: '#000000',
        iconcolor: '#543847',
        iconbg: '#FFFFFF',
        contrastText: '#FFFFFF',
        PropertyHeaderBg: '#f6fbff',
        widgetTitleBg: '#543847',
        cardTitleBg: '#f50057',
        tabsBg: '#f8f8fb',
        tabsSelectedBg: '#dbcfd5',
        tabsSelectedIndicator: '#0c1a82'
      },
      padding: '1rem',
      margin: '0.5rem 0rem 1rem 0rem',
      marginTop: '1rem',
      shadow: '0 7px 14px 0 rgb(65 69 88 / 7%), 0 3px 6px 0 rgb(0 0 0 / 12%)',
      radius: '8px',
      error: red,
      PropertyHeaderBdr: '1px solid #543847',
      flatWidgetBdr: '12px solid #543847'
    },
    status: {
      danger: 'orange'
    },
    layoutMaxWidth: {
      boxed: 1920,
      container: 1920
    },
    properties: {
      gridLayout: 'grid grid-cols-3 gap-10'
    },
    icons: {
      fontSize: 'iconsWidget'
    },
    buttons: {
      background: '#543847',
      color: '#ffffff',
      fontSize: '1rem !important',
      borderRadius: '20px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '6px 16px',
      textTransform: 'capitalize',
      buttonBackgroundHover: '#ffffff',
      buttonHoverColor: '#000000'
    }
  }
};

export default themesConfig;
