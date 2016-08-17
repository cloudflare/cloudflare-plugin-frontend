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
import ProtocolRewriteCard from '../containers/ProtocolRewriteCard/ProtocolRewriteCard';
import PurgeCacheCard from '../containers/PurgeCacheCard/PurgeCacheCard';
import SSLCard from '../containers/SSLCard/SSLCard';
import ScanCard from '../containers/ScanCard/ScanCard';
import SecurityLevelCard from '../containers/SecurityLevelCard/SecurityLevelCard';
import WAFCard from '../containers/WAFCard/WAFCard';
import PluginSpecificCacheCard from '../containers/PluginSpecificCacheCard/PluginSpecificCacheCard';
import PluginSpecificCacheTagCard from '../containers/PluginSpecificCacheTagCard/PluginSpecificCachetTagCard.js';
import RailgunCard from '../containers/RailgunCard/RailgunCard';

// Pages
import DNSManagementPage from '../containers/DNSManagementPage/DNSManagementPage';

let cardMapper = {
	"AdvanceDDoSCard": AdvanceDDoSCard,
	"AlwaysOnlineCard": AlwaysOnlineCard,
	"ApplyDefaultSettingsCard": ApplyDefaultSettingsCard,
	"BrowserCacheTTLCard": BrowserCacheTTLCard,
	"BrowserIntegrityCheckCard": BrowserIntegrityCheckCard,
	"CacheLevelCard": CacheLevelCard,
	"ChallengePassageCard": ChallengePassageCard,
	"DevelopmentModeCard": DevelopmentModeCard,
	"IPV6Card": IPV6Card,
	"ImageOptimizationCard": ImageOptimizationCard,
	"IpRewriteCard": IpRewriteCard,
	"MinifyCard": MinifyCard,
	"PluginSpecificCacheCard": PluginSpecificCacheCard,
	"PluginSpecificCacheTagCard": PluginSpecificCacheTagCard,
	"ProtocolRewriteCard": ProtocolRewriteCard,
	"PurgeCacheCard": PurgeCacheCard,
	"SSLCard": SSLCard,
  	"ScanCard": ScanCard,
	"SecurityLevelCard": SecurityLevelCard,
  	"WAFCard": WAFCard,
  	"PluginSpecificCacheCard": PluginSpecificCacheCard,
  	"RailgunCard": RailgunCard,  
  	"DNSManagementPage": DNSManagementPage,
};

export { cardMapper };