"use client";

import React, { useState, useEffect } from "react";
import CaseStudyInfo from "./CaseStudyInfo";
import { CASE_STUDY } from "./caseStudyData";
import { caseStudyData as caseStudyDetails } from "./caseStudyDetails";
import CommonLayout from "../../components/common/CommonLayout";
import { ROUTE } from "../../constants/constants";

function CaseStudyPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(CASE_STUDY[0]);

  useEffect(() => {
    // Get the selected case study ID from localStorage
    const selectedCaseStudyId = localStorage.getItem("selectedCaseStudyId");

    if (selectedCaseStudyId) {
      // Find the case study by ID
      const foundCaseStudy = CASE_STUDY.find(
        (cs) => cs.id === selectedCaseStudyId
      );
      if (foundCaseStudy) {
        setSelectedCaseStudy(foundCaseStudy);
      }
    }
  }, []);

  // Get case study details if available
  const getCaseStudyDetails = () => {
    if (
      selectedCaseStudy?.detailsKey &&
      caseStudyDetails[selectedCaseStudy.detailsKey]
    ) {
      return caseStudyDetails[selectedCaseStudy.detailsKey];
    }
    return null;
  };

  const caseStudyDetailsData = getCaseStudyDetails();

  return (
    <CommonLayout page={ROUTE.WORK.LABEL}>
      <CaseStudyInfo
        caseStudyId={selectedCaseStudy?.id}
        caseStudyDetails={caseStudyDetailsData}
      />
    </CommonLayout>
  );
}

export default CaseStudyPage;
