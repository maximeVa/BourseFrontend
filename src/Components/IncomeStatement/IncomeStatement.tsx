import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../company";
import { useOutletContext } from "react-router";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

interface Props {}

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Total Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Operating Expenses",
    render: (company: CompanyIncomeStatement) => company.operatingExpenses,
  },
  {
    label: "Gross Profit",
    render: (company: CompanyIncomeStatement) => company.grossProfit,
  },
  {
    label: "Gross Margin Ratio",
    render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
  },
  {
    label: "Income Before Tax",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await getIncomeStatement(ticker);
      setIncomeStatement(result!.data);
    };
    incomeStatementFetch();
  }, []);
  return (
    <>
      {" "}
      {incomeStatement ? (
        <>
          <Table config={configs} data={incomeStatement}></Table>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
