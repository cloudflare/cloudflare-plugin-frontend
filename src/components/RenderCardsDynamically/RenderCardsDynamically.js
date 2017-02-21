import React from "react";
import _ from "lodash";
import { cardMapper } from "../../utils/ImportCards";

export function renderCards(cards) {
  // While rendering config.*isEnabled settings are not being checked
  return _.map(cards, function(cardName, i) {
    return React.createElement(cardMapper[cardName], { key: i });
  });
}
