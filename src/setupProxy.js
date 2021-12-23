const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/eq-api/eq-auth/', {
      target: 'https://eqmonarch-iam.altidev.net/iam',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/eq-auth/': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/core', {
      target: 'http://10.5.1.22/eq-api/core',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/core': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/properties', {
      target: 'http://10.5.1.22/eq-api/properties',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/properties': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/flowable-engage', {
      target: 'http://10.5.1.22/eq-api/flowable-engage',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/flowable-engage': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/loan', {
      target: 'http://10.5.1.22/eq-api/loan',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/loan': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/party', {
      target: 'http://10.5.1.22/eq-api/party',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/party': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/property', {
      target: 'http://10.5.1.22/eq-api/property',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/property': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/monarch/', {
      target: 'http://10.5.1.22/eq-api/monarch/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/monarch/': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/service-wizard', {
      target: 'http://10.5.1.22/eq-api/service-wizard',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/service-wizard': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-files/file', {
      target: 'http://10.5.1.22/eq-files/file',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-files/file': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/fileDetails', {
      target: 'http://10.5.1.22/eq-api/fileDetails',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/fileDetails': ''
      },
      headers: {
        tenantCode: 'ASPS'
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/tenants', {
      target: 'http://10.5.1.22/eq-api/tenants',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/tenants': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/core/ldap', {
      target: 'http://10.5.1.22/core/ldap',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/ldap': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/file/eqFiles', {
      target: 'http://10.5.1.22/file/eqFiles',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/file/eqFiles': ''
      }
    })
  );
  /*
  app.use(
    createProxyMiddleware('/eq-files/file', {
      target: 'http://10.59.3.48/eq-files/file',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-files/file': ''
      }
    })
  );*/

  app.use(
    createProxyMiddleware('/eq-api/usermetadata', {
      target: 'http://10.5.1.22/eq-api/usermetadata',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/usermetadata': ''
      }
    })
  );
  /*
  app.use(
    createProxyMiddleware('/eq-api/user', {
      target: 'http://10.59.3.46/userssvc',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/user': ''
      }
    })
  );
*/
  app.use(
    createProxyMiddleware('/eq-ui/datastudio', {
      target: 'http://10.5.1.22/eq-api/datastudio',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-ui/datastudio': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/milestone', {
      target: 'http://10.5.1.22/eq-api/milestone',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/milestone': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/xref', {
      target: 'http://10.5.1.22/eq-api/xref',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/xref': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/property-filter', {
      target: 'http://10.5.1.22/property-filter',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/property-filter': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/integration', {
      target: 'http://10.5.1.22/eq-api/integration',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/integration': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/wizard', {
      target: 'http://10.5.1.22/eq-api/wizard',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/wizard': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/vmagent', {
      target: 'http://10.5.1.22/eq-api/vmagent',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/vmagent': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/adminservice', {
      target: 'http://10.5.1.22/eq-api/adminservice',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/adminservice': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/enum/enumerationMasters', {
      target: 'http://10.5.1.22/eq-api/enum/enumerationMasters',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/enum/enumerationMasters': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/vendormgmt', {
      target: 'http://10.5.1.22/eq-api/vendormgmt/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/vendormgmt': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/reo', {
      target: 'http://10.5.1.22/eq-api/reo',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/reo': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/offermeta', {
      target: 'http://10.5.1.22/eq-api/offermeta',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/offermeta': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/tbd', {
      target: 'http://10.5.1.22/eq-api/tbd/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/tbd': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/cwcot', {
      target: 'http://10.5.1.22/eq-api/cwcot/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/cwcot': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/venlisting', {
      target: 'http://10.5.1.22/eq-api/venlisting',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/venlisting': ''
      }
    })
  );
  app.use(
    createProxyMiddleware('/eq-api/prlisting', {
      target: 'http://10.5.1.22/eq-api/prlisting',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/prlisting': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/inlisting', {
      target: 'http://10.5.1.22/eq-api/inlisting',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/inlisting': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/enum', {
      target: 'http://10.5.1.22/eq-api/enum',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/enum': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/bulk-upload', {
      target: 'http://10.5.1.22/eq-api/bulk-upload/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/bulk-upload': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/mailmerge', {
      target: 'http://10.5.1.22//eq-api/mailmerge/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/mailmerge': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/ext-legacymessages', {
      target: 'http://10.5.1.22/eq-api/ext-legacymessages/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/ext-legacymessages': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/ext-legacytasks', {
      target: 'http://10.5.1.22/eq-api/ext-legacytasks/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/ext-legacytasks': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-files-v2/file', {
      target: 'http://10.5.1.22/eq-files-v2/file',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-files-v2/file': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-ui/control', {
      target: 'http://10.5.1.22/eq-ui/control',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-ui/control': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/change-logs', {
      target: 'http://eqmonarch-dev.altidev.net/eq-api/change-logs/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/change-logs': ''
      }
    })
  );

  app.use(
    createProxyMiddleware('/eq-api/messages/', {
      target: 'http://10.5.1.22/eq-api/messages/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/eq-api/messages/': ''
      }
    })
  );
};
