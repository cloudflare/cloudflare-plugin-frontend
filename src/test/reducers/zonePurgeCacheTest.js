import { expect } from "chai";
import { zonePurgeCacheReducer } from "../../reducers/zonePurgeCache";
import * as ActionTypes from "../../constants/ActionTypes";

let initialState = {
  isFetching: false
};

describe("Plugin Settings Reducer", () => {
  it("should return the initial state", () => {
    expect(zonePurgeCacheReducer(initialState, {})).to.eql(initialState);
  });

  it("should handle ZONE_PURGE_CACHE", () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE
      })
    ).to.eql({
      isFetching: true
    });
  });

  it("should handle ZONE_PURGE_CACHE_SUCCESS", () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE_SUCCESS
      })
    ).to.eql({
      isFetching: false
    });
  });

  it("should handle ZONE_PURGE_CACHE_ERROR", () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE_ERROR
      })
    ).to.eql({
      isFetching: false
    });
  });
});
