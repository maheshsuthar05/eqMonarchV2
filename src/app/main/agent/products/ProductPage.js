import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    height: 600,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText
  },
  badge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main)
  }
}));

function ProductPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={clsx(classes.header, 'flex')}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-128 mx-24">
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Typography variant="h2" color="inherit" className="font-light">
                Simple Pricing!
              </Typography>
            </FuseAnimate>

            <FuseAnimate duration={400} delay={600}>
              <Typography
                variant="subtitle1"
                color="inherit"
                className="opacity-75 mt-16 mx-auto max-w-512"
              >
                Agent Elite provides agents access to Equator's local market
                data and insights, platform and REO certification and real-time
                notification of new REO assets.
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>

      <div className="-mt-192">
        <div className="w-full max-w-2xl mx-auto">
          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn'
            }}
            className="flex items-center justify-center flex-wrap"
          >
            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card className="relative">
                <div className="pt-48 pb-24 text-center">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="text-20 font-medium"
                  >
                    ADVERTISEMENT
                  </Typography>
                </div>

                <CardContent className="text-center p-0">
                  <div className="flex flex-col">
                    <div className="flex justify-center mb-8">
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className="font-medium"
                      >
                        $
                      </Typography>
                      <Typography className="text-56 mx-4 font-light leading-none">
                        4
                      </Typography>
                    </div>
                    <Typography
                      color="textSecondary"
                      className="font-medium text-16"
                    >
                      PER MONTH
                    </Typography>
                  </div>

                  <div className="flex flex-col p-32">
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">REO</span>
                      <span>Alerts</span>
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">1</span>
                      Advertisement per city
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">LINKS</span>
                      form to generate leads
                    </Typography>
                  </div>
                </CardContent>

                <div className="flex justify-center pb-32">
                  <Button variant="contained" color="primary" className="w-128">
                    GET STARTED
                  </Button>
                </div>
              </Card>
            </div>

            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card className="relative" raised>
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <div className={clsx(classes.badge, 'py-4 px-8')}>
                    <Typography variant="caption" color="inherit">
                      BEST VALUE
                    </Typography>
                  </div>
                </div>
                <div className="pt-48 pb-24 text-center">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="text-20 font-medium"
                  >
                    AGENT ELITE
                  </Typography>
                </div>
                <CardContent className="text-center p-0">
                  <div className="flex flex-col">
                    <div className="flex justify-center mb-8">
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className="font-medium"
                      >
                        $
                      </Typography>
                      <Typography className="text-56 mx-4 font-light leading-none">
                        399
                      </Typography>
                    </div>
                    <Typography
                      color="textSecondary"
                      className="font-medium text-16"
                    >
                      PER YEAR
                    </Typography>
                  </div>

                  <div className="flex flex-col p-32">
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">REO</span>
                      Alerts
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">REO Market</span>
                      Insights
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">Certification</span>
                      Elite
                    </Typography>
                  </div>
                </CardContent>
                <div className="flex justify-center pb-32">
                  <Button variant="contained" color="primary" className="w-128">
                    GET STARTED
                  </Button>
                </div>
              </Card>
            </div>
            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card className="relative">
                <div className="pt-48 pb-24 text-center">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="text-20 font-medium"
                  >
                    PREMIUM PLACEMENT
                  </Typography>
                </div>

                <CardContent className="text-center p-0">
                  <div className="flex flex-col">
                    <div className="flex justify-center mb-8">
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        className="font-medium"
                      >
                        $
                      </Typography>
                      <Typography className="text-56 mx-4 font-light leading-none">
                        5
                      </Typography>
                    </div>
                    <Typography
                      color="textSecondary"
                      className="font-medium text-16"
                    >
                      PER MONTH
                    </Typography>
                  </div>

                  <div className="flex flex-col p-32">
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">1</span>
                      Free ZIP
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">Move High</span>
                      In Serach
                    </Typography>
                    <Typography variant="subtitle1" className="mb-8">
                      <span className="font-bold mx-4">Promote</span>
                      your services
                    </Typography>
                  </div>
                </CardContent>

                <div className="flex justify-center pb-32">
                  <Button variant="contained" color="primary" className="w-128">
                    GET STARTED
                  </Button>
                </div>
              </Card>
            </div>
          </FuseAnimateGroup>

          <div className="flex flex-col items-center py-96 text-center sm:ltr:text-left sm:rtl:text-right max-w-xl mx-auto">
            <Typography variant="h4" className="pb-32 font-light">
              Frequently Asked Questions
            </Typography>

            <div className="flex flex-wrap w-full">
              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">
                  How does free trial work?
                </Typography>
                <Typography className="text-16" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur a diam nec augue tincidunt accumsan. In dignissim
                  laoreet ipsum eu interdum.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">
                  Can I cancel any time?
                </Typography>
                <Typography className="text-16" color="textSecondary">
                  Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus
                  blandit quis. Sed quis neque tellus. Donec maximus ipsum in
                  malesuada hendrerit.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">
                  What happens after my trial ended?
                </Typography>
                <Typography className="text-16" color="textSecondary">
                  Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus
                  blandit quis. Sed quis neque tellus. Donec maximus ipsum in
                  malesuada hendrerit.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">
                  Can I have a discount?
                </Typography>
                <Typography className="text-16" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur a diam nec augue tincidunt accumsan. In dignissim
                  laoreet ipsum eu interdum.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
