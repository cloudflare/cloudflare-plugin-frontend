import AlwaysOnlineCard from '../containers/AlwaysOnlineCard/AlwaysOnlineCard';
import ApplyDefaultSettingsCard from '../containers/ApplyDefaultSettingsCard/ApplyDefaultSettingsCard';
import SSLCard from '../containers/SSLCard/SSLCard';
import PurgeCacheCard from '../containers/PurgeCacheCard/PurgeCacheCard';
import CacheLevelCard from '../containers/CacheLevelCard/CacheLevelCard';
import ImageOptimizationCard from '../containers/ImageOptimizationCard/ImageOptimizationCard';
import SecurityLevelCard from '../containers/SecurityLevelCard/SecurityLevelCard';
import WAFCard from '../containers/WAFCard/WAFCard';
	
let cardMapper = {
  "AlwaysOnlineCard": AlwaysOnlineCard,
  "ApplyDefaultSettingsCard": ApplyDefaultSettingsCard,
  "SSLCard": SSLCard,
  "PurgeCacheCard": PurgeCacheCard,
  "CacheLevelCard": CacheLevelCard,
  "ImageOptimizationCard": ImageOptimizationCard,
  "SecurityLevelCard": SecurityLevelCard,
  "WAFCard": WAFCard,
};


export { cardMapper };