import React from 'react';

const PageHeader = ({ title, breadcrumb }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-xs font-medium text-[#78675C] mb-2 uppercase tracking-widest">
        <span>BrewMaster</span>
        <span>/</span>
        <span className="text-[#3E2C1C]">{breadcrumb}</span>
      </div>
      <h1 className="text-3xl font-bold text-[#3E2C1C]">{title}</h1>
    </div>
  );
};

export default PageHeader;