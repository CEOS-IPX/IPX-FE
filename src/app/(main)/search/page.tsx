"use client";

import InformationA from "@/components/search/items/InformationA";
import InformationB from "@/components/search/items/InformationB";
import InformationC from "@/components/search/items/InformationC";
import InformationD from "@/components/search/items/InformationD";
import { Footer } from "@/components/search/Footer";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { useSearchForm } from "@/hooks/useSearchForm";

export default function SearchPage() {
  const form = useSearchForm();

  return (
    <div className="flex flex-col gap-15 px-20 py-5">
      <h1 className="text-headline-28 text-title-primary">새로운 선행 기술 탐색하기</h1>

      <InformationA
        title={form.title}
        onChangeTitle={form.setTitle}
        technicalField={form.technicalField}
        onChangeTechnicalField={form.setTechnicalField}
        ipcInput={form.ipcInput}
        onChangeIpcInput={form.setIpcInput}
        description={form.description}
        onChangeDescription={form.setDescription}
        requiredApplicationNumbers={form.requiredApplicationNumbers}
        onOpenPatentModal={() => form.setIsModalOpen(true)}
      />

      <InformationB
        applicantName={form.applicantName}
        onChangeApplicantName={form.setApplicantName}
        inventorName={form.inventorName}
        onChangeInventorName={form.setInventorName}
        companyName={form.companyName}
        onChangeCompanyName={form.setCompanyName}
        clientName={form.clientName}
        onChangeClientName={form.setClientName}
      />

      <InformationC
        elements={form.elements}
        isLoading={form.isLoading}
        aiCreateError={form.aiCreateError}
        onAICreate={form.handleAICreate}
        onAdd={form.handleAdd}
        onDelete={form.handleDelete}
        onChange={form.handleChange}
      />

      <InformationD
        priorArtReference={form.priorArtReference}
        onChangePriorArtReference={form.setPriorArtReference}
        differentiationNotes={form.differentiationNotes}
        onChangeDifferentiationNotes={form.setDifferentiationNotes}
        measurementConditions={form.measurementConditions}
        onChangeMeasurementConditions={form.setMeasurementConditions}
        measurementResults={form.measurementResults}
        onChangeMeasurementResults={form.setMeasurementResults}
      />

      {form.startSearchError && (
        <p className="text-label-13 text-error-default">{form.startSearchError}</p>
      )}

      <Footer
        disabled={!form.isReadyToStart || form.isStartingSearch}
        resultCount={form.resultCount}
        onResultCountChange={form.setResultCount}
        onStart={form.handleStart}
      />

      {form.isModalOpen && (
        <PatentImportModal
          initialPatentNumber=""
          onClose={() => form.setIsModalOpen(false)}
          onSubmit={({ patentNumber }) => form.handleImportPatentNumber(patentNumber)}
        />
      )}
    </div>
  );
}
