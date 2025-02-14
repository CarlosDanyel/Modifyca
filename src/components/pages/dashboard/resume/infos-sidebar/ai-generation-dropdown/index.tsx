import { Button } from '@/components/ui/button';
import {
  BadgeCent,
  Bot,
  BriefcaseBusiness,
  CirclePercent,
  Languages,
  PencilLine,
} from 'lucide-react';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerationDialog } from './generation-dialog';
import { useQuery } from '@tanstack/react-query';
import { ApiServices } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { BuyCreditsDialog } from './buy-credits-dialog';
import { queyKeys } from '@/constants/querys-keys';
import { toast } from 'sonner';

const AiGenerationDropdown = () => {
  const [generationMode, setGenerationMode] = useState<AiGenerationMode | null>(
    null
  );

  const [showCreditsDialog, setShowCreditsDialog] = useState(false);

  const onAction = (mode: AiGenerationMode) => {
    if (!credits) {
      toast.error('Você não tem créditos suficientes!', {
        action: {
          label: 'Comprar créditos',
          onClick: () => setShowCreditsDialog(true),
        },
      });

      return;
    }

    setGenerationMode(mode);
  };

  const actions = [
    {
      label: 'Comprar créditos',
      icon: CirclePercent,
      onClick: () => setShowCreditsDialog(true),
    },
    {
      label: 'Gerar conteudo para vaga de emprego',
      icon: BriefcaseBusiness,
      onClick: () => onAction('JOB_TITLE'),
    },
    {
      label: 'Melhorar e corrigir contéudo existente',
      icon: PencilLine,
      onClick: () => onAction('FIX_CONTENT'),
    },
    {
      label: 'Traduzir contéudo existente',
      icon: Languages,
      onClick: () => onAction('TRANSLATE_CONTENT'),
    },
  ];

  const { data: credits, isLoading } = useQuery({
    queryKey: queyKeys.credits,
    queryFn: ApiServices.getCredits,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'default'}
            size={'header'}
            className="flex gap 2 text-xs transition-all bg-resume-primary text-white hover:bg-resume-primary-100 !hover:bg-resume-primary-500"
          >
            <Bot size={20} />
            Inteligência Arificial
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={15} align="start" className="mr-5">
          <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-1">
            Você possui {''}
            <strong className="text-foreground inline-flex gap-0.5 items-center">
              <BadgeCent size={14} />
              {isLoading ? <Skeleton className="w-5 h-5" /> : credits} {''}
              {credits === 1 ? 'Crédito' : 'Créditos'}
            </strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {actions.map(action => (
            <DropdownMenuItem
              key={action.label}
              className="gap-2"
              onClick={action.onClick}
              disabled={isLoading}
            >
              <action.icon size={18} className="text-muted-foreground" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <BuyCreditsDialog
        open={showCreditsDialog}
        setOpen={setShowCreditsDialog}
      />

      {!!generationMode && (
        <GenerationDialog
          mode={generationMode}
          open={!!generationMode}
          setOpen={value => {
            if (!value) setGenerationMode(null);
          }}
        />
      )}
    </>
  );
};

export default AiGenerationDropdown;
