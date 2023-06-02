import { useState } from 'react';

export const Tabs = ({ tabs }: {
  tabs: { name: string; key: string; component: JSX.Element }[];
}) => {
  const initKey = tabs[0].key;
  const [tabsState, setTabsState] = useState(initKey);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {tabs.map((tab) => (
          <button
            className={`tabs__control ${tabsState === tab.key ? 'is-active' : ''}`}
            type="button"
            onClick={() => setTabsState(tab.key)}
            key={tab.key}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {tabs.map((tab) => {
            if (tab.key === tabsState) {
              return tab.component;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
