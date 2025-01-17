// @flow

import type { Node } from "react";
import React, { useContext } from "react";
import { Dimensions } from "react-native";

import { ExploreContext } from "../../providers/contexts";
import ObservationViews from "../SharedComponents/ObservationViews/ObservationViews";
import ViewWithFooter from "../SharedComponents/ViewWithFooter";
import BottomCard from "./BottomCard";

const { height } = Dimensions.get( "screen" );

// make map small enough to show bottom card
const mapHeight = height - 450;

const Explore = ( ): Node => {
  const {
    exploreList,
    loadingExplore,
    exploreFilters,
    totalObservations
  } = useContext( ExploreContext );
  const taxonId = exploreFilters ? exploreFilters.taxon_id : null;

  return (
    <ViewWithFooter>
      {taxonId !== null && (
        <ObservationViews
          loading={loadingExplore}
          localObservations={{
            observationList: exploreList,
            unuploadedObsList: [],
            allObsToUpload: []
          }}
          taxonId={taxonId}
          testID="Explore.observations"
          mapHeight={mapHeight}
          totalObservations={totalObservations}
        />
      )}
      <BottomCard />
    </ViewWithFooter>
  );
};

export default Explore;
