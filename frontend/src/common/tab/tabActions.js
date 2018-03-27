export function selectTab(tabId){
    
    return {
        type:'TAB_SELECTED',
        payload: tabId
    }
}

//(...tabs) operador rest que transforma os paranetros em array
export function showTabs(...tabsIds){
    const tabsToShow = {}
    tabsIds.forEach(e => tabsToShow[e] = true)
    return{
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}