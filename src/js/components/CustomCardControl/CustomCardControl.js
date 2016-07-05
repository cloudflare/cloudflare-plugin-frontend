import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CardControl } from 'cf-component-card';
import { Button } from 'cf-component-button';
import { CLOUDFLARE_UPGRADE_PAGE } from '../../constants/UrlPaths.js';

class CustomCardControl extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    render() {
        let { integrationName } = this.props;

        // TODO: Add minimumPlan to lang folder 
        let planList = {
            "Free Website": 0,
            "Pro Plan": 1,
            "Biz Plan": 2,
            "Ent Plan": 3
        };

        var currentPlan = this.props.hasOwnProperty("currentPlan") ? this.props.currentPlan : planList["Free Website"];
        var minimumPlan = this.props.hasOwnProperty("minimumPlan") ? this.props.minimumPlan : planList["Free Website"];
        var needToUpgrade = planList[currentPlan] < planList[minimumPlan];

        let upgradeLink = CLOUDFLARE_UPGRADE_PAGE + "?utm_source=pi-" + integrationName + "&utm_medium=plugin&utm_campaign=" + integrationName;
        
        return (
            <CardControl>
                <p>
                { needToUpgrade ? (
                        <Button type="primary" onClick={ function(){window.open(upgradeLink); return false;}}>
                            Upgrade to { minimumPlan }
                        </Button> 
                    ) :
                    this.props.children
                }
                </p>
            </CardControl>
        );
    }
}

function mapStateToProps(state) {
    return {
        integrationName: state.config.config.integrationName,
    }
}
export default injectIntl(connect(mapStateToProps)(CustomCardControl));
