const LOCALIZED_PRO_PLAN_ID = 'constants.plans.pro';
const LOCALIZED_BIZ_PLAN_ID = 'constants.plans.biz';
const LOCALIZED_ENT_PLAN_ID = 'constants.plans.ent';

export const FREE_PLAN = 'free';
export const PRO_PLAN = 'pro';
export const BIZ_PLAN = 'business'; 
export const ENT_PLAN = 'enterprise'; 

export function planNeedsUpgrade(currentPlan, minimumPlan) {
    var planList = {};
    planList[FREE_PLAN] = 0;
    planList[PRO_PLAN] = 1;
    planList[BIZ_PLAN] = 2;
    planList[ENT_PLAN] = 3;

    return planList[currentPlan] < planList[minimumPlan];
}

export function getLocalizedPlanId(planName) {
    var localizedPlanName = planName;
    switch (planName) {
        case PRO_PLAN:
            localizedPlanName = LOCALIZED_PRO_PLAN_ID;
            break;
        case BIZ_PLAN:
            localizedPlanName = LOCALIZED_BIZ_PLAN_ID;
            break;
        case ENT_PLAN:
            localizedPlanName = LOCALIZED_ENT_PLAN_ID;
            break;
        default:
            // This should never happen
            break;
    }

    return localizedPlanName;
}