// Cards
import AdvanceDDoSCard from '../containers/AdvanceDDoSCard/AdvanceDDoSCard';
import AlwaysOnlineCard from '../containers/AlwaysOnlineCard/AlwaysOnlineCard';
import ApplyDefaultSettingsCard from '../containers/ApplyDefaultSettingsCard/ApplyDefaultSettingsCard';
import BrowserCacheTTLCard from '../containers/BrowserCacheTTLCard/BrowserCacheTTLCard';
import BrowserIntegrityCheckCard from '../containers/BrowserIntegrityCheckCard/BrowserIntegrityCheckCard';
import CacheLevelCard from '../containers/CacheLevelCard/CacheLevelCard';
import ChallengePassageCard from '../containers/ChallengePassageCard/ChallengePassageCard';
import DevelopmentModeCard from '../containers/DevelopmentModeCard/DevelopmentModeCard';
import IPV6Card from '../containers/IPV6Card/IPV6Card';
import ImageOptimizationCard from '../containers/ImageOptimizationCard/ImageOptimizationCard';
import IpRewriteCard from '../containers/IpRewriteCard/IpRewriteCard';
import MinifyCard from '../containers/MinifyCard/MinifyCard';
import PurgeCacheCard from '../containers/PurgeCacheCard/PurgeCacheCard';
import SSLCard from '../containers/SSLCard/SSLCard';
import SecurityLevelCard from '../containers/SecurityLevelCard/SecurityLevelCard';
import WAFCard from '../containers/WAFCard/WAFCard';
import PluginSpecificCacheCard from '../containers/PluginSpecificCacheCard/PluginSpecificCacheCard';
import PluginSpecificCacheTagCard from '../containers/PluginSpecificCacheTagCard/PluginSpecificCachetTagCard.js';
import RailgunCard from '../containers/RailgunCard/RailgunCard';
import AutomaticHTTPSRewritesCard from '../containers/AutomaticHTTPSRewritesCard/AutomaticHTTPSRewritesCard';
import AutomaticPlatformOptimizationCard from '../containers/AutomaticPlatformOptimization/AutomaticPlatformOptimizationCard';

// Pages
import DNSManagementPage from '../containers/DNSManagementPage/DNSManagementPage';

const cardMapper = {
  AdvanceDDoSCard: AdvanceDDoSCard,
  AlwaysOnlineCard: AlwaysOnlineCard,
  ApplyDefaultSettingsCard: ApplyDefaultSettingsCard,
  AutomaticHTTPSRewritesCard: AutomaticHTTPSRewritesCard,
  AutomaticPlatformOptimizationCard: AutomaticPlatformOptimizationCard,
  BrowserCacheTTLCard: BrowserCacheTTLCard,
  BrowserIntegrityCheckCard: BrowserIntegrityCheckCard,
  CacheLevelCard: CacheLevelCard,
  ChallengePassageCard: ChallengePassageCard,
  DNSManagementPage: DNSManagementPage,
  DevelopmentModeCard: DevelopmentModeCard,
  IPV6Card: IPV6Card,
  ImageOptimizationCard: ImageOptimizationCard,
  IpRewriteCard: IpRewriteCard,
  MinifyCard: MinifyCard,
  PluginSpecificCacheCard: PluginSpecificCacheCard,
  PluginSpecificCacheTagCard: PluginSpecificCacheTagCard,
  PurgeCacheCard: PurgeCacheCard,
  RailgunCard: RailgunCard,
  SSLCard: SSLCard,
  SecurityLevelCard: SecurityLevelCard,
  WAFCard: WAFCard
};

export { cardMapper };
