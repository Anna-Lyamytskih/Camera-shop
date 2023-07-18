import { useEffect, useState } from 'react';
import {useSearchParams } from 'react-router-dom';


export const Tabs = ({ tabs }: {
  tabs: { name: string; key: string; component: JSX.Element }[];
}) => {
  const initKey = tabs[0].key;
  const [tabsState, setTabsState] = useState(initKey);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab');

  useEffect(()=> {
    if(!activeTab && tabsState){
      setSearchParams(`?tab=${initKey}`);
    }
  },[activeTab, tabsState, initKey, setSearchParams]);

  useEffect(()=> {
    if(!activeTab){
      setTabsState(initKey);
    }
  },[activeTab]);

  const urlChangeHandler = (item:string) => {
    setTabsState('');
    setSearchParams(`?tab=${item}`);
  };

  return (
    <div className="tabs product__tabs">
      { activeTab ?
        <div className="tabs__controls product__tabs-controls">
          {tabs.map((tab) => (
            <button
              className={`tabs__control ${activeTab === tab.key ? 'is-active' : ''}`}
              type="button"
              onClick={() => urlChangeHandler(tab.key)}
              key={tab.key}
            >
              {tab.name}
            </button>
          ))}
        </div>
        :
        <div className="tabs__controls product__tabs-controls">
          {tabs.map((tab) => (
            <button
              className={`tabs__control ${tabsState === tab.key ? 'is-active' : ''}`}
              type="button"
              onClick={() => urlChangeHandler(tab.key)}
              key={tab.key}
            >
              {tab.name}
            </button>
          ))}
        </div>}
      <div className="tabs__content">
        {activeTab ?
          <div className="tabs__element is-active">
            {tabs.map((tab) => {
              if (tab.key === activeTab) {
                return tab.component;
              }
              return null;
            })}
          </div>
          :
          <div className="tabs__element is-active">
            {tabs.map((tab) => {
              if (tab.key === tabsState) {
                return tab.component;
              }
              return null;
            })}
          </div> }
      </div>
    </div>
  );
};
