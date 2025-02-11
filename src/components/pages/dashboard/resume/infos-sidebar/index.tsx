import Link from 'next/link';
import React from 'react';
import Logo from '@/assets/logo.svg';
import { Separator } from '@/components/ui/separator';
import BasicInfoSection from './sections/basic-info';
import SummarySection from './sections/summary';
import MultiplesSections from './sections/multiples';
import AiGenerationDropdown from './ai-generation-dropdown';
import { ArrowLeft } from 'lucide-react';

const InfosSidebar = () => {
  return (
    <aside className="w-full h-full p-6 overflow-y-auto ">
      <div className="w-full flex items-center justify-between  ">
        <Link
          href={'/dashboard/resumes/'}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>
        <AiGenerationDropdown />
      </div>
      <Separator className="my-5" />
      <BasicInfoSection />
      <Separator className="my-5" />
      <SummarySection />
      <MultiplesSections />
    </aside>
  );
};

export default InfosSidebar;
