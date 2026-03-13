/**
 * Dados dos Patrocinadores — Incends Conference
 *
 * Logos organizados em src/assets/logos/{ouro,prata,bronze}/
 * Importados estaticamente via @/ alias (Vite)
 */

// ── Imports Ouro ──────────────────────────────────────
import logoCaptouro from "@/assets/logos/ouro/Captouro.webp";
import logoVersatil from "@/assets/logos/ouro/Versatil.webp";
import logoA2Brindes from "@/assets/logos/ouro/a2 brindes.webp";
import logoBoxtur from "@/assets/logos/ouro/boxtur.webp";
import logoFernandoBraide from "@/assets/logos/ouro/fernando braide.webp";
import logoFormulare from "@/assets/logos/ouro/formulare.webp";
import logoOlharSaude from "@/assets/logos/ouro/olhar saude.webp";
import logoOuroDaIlha from "@/assets/logos/ouro/ouro da ilha.webp";
import logoPulseArena from "@/assets/logos/ouro/pulse arena.webp";
import logoVerona from "@/assets/logos/ouro/verona.webp";

// ── Imports Prata ─────────────────────────────────────
import logoAtacSistemas from "@/assets/logos/prata/ATAC Sistemas.png";
import logoCasaRolamentos from "@/assets/logos/prata/CASA_ROLAMENTOS.png";
import logoGlowPop from "@/assets/logos/prata/GLOW POP.webp";
import logoMateusFiquene from "@/assets/logos/prata/Mateus Fiquene Imoveis Exclusivos.webp";
import logoSamSurgery from "@/assets/logos/prata/SAM Surgery.webp";
import logoSlbd from "@/assets/logos/prata/SLBD EMPREEDIMENTOS LTDA.webp";
import logoVitoriaInfra from "@/assets/logos/prata/Vitoria Infraestrutura.webp";

// ── Imports Bronze ────────────────────────────────────
import logoBronze01 from "@/assets/logos/bronze/AnyConv.com__ChatGPT Image 11 de mar. de 2026, 20_25_07.webp";
import logoBronze02 from "@/assets/logos/bronze/AnyConv.com__Florescer pediatria10.webp";
import logoBronze03 from "@/assets/logos/bronze/AnyConv.com__IMG_1044.webp";
import logoBronze04 from "@/assets/logos/bronze/AnyConv.com__PROJETO 4-1.webp";
import logoBronze05 from "@/assets/logos/bronze/AnyConv.com__construlider_logo_transparente.webp";
import logoBronze06 from "@/assets/logos/bronze/AnyConv.com__horizontal fundo verde.webp";
import logoBronze07 from "@/assets/logos/bronze/IMG_1092.webp";
import logoBronze08 from "@/assets/logos/bronze/IMG_3200.webp";
import logoBronze09 from "@/assets/logos/bronze/Logo_horizontal_fundo_c_margem_azul_3x.webp";
import logoBronze10 from "@/assets/logos/bronze/RODRIGO-ARRAIS-AZUL.webp";
import logoBronze11 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-07-at-11.09.49.webp";
import logoBronze12 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-09-at-09.36.05.webp";
import logoBronze13 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-09-at-09.36.07.webp";
import logoBronze14 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-09-at-15.23.26.webp";
import logoBronze15 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-10-at-12.12.40.webp";
import logoBronze16 from "@/assets/logos/bronze/WhatsApp-Image-2026-03-11-at-13.36.47.webp";
import logoBronze17 from "@/assets/logos/bronze/boneinperial.webp";
import logoBronze18 from "@/assets/logos/bronze/brokerNestle.webp";

// ── Tipos ─────────────────────────────────────────────

export interface PatrocinadorOuro {
  nome: string;
  logo: string;
  descricao: string;
  instagram: string;
}

export interface PatrocinadorPrata {
  nome: string;
  logo: string;
  descricao: string;
  instagram: string;
}

export interface PatrocinadorBronze {
  nome: string;
  logo: string;
}

// ── Dados Ouro ────────────────────────────────────────

export const patrocinadoresOuro: PatrocinadorOuro[] = [
  {
    nome: "Captouro",
    logo: logoCaptouro,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/captouro/",
  },
  {
    nome: "Versátil",
    logo: logoVersatil,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/versatileventosebuffet/",
  },
  {
    nome: "A2 Brindes",
    logo: logoA2Brindes,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/a2_brindes/",
  },
  {
    nome: "BoxTur",
    logo: logoBoxtur,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/boxturbrasil/",
  },
  {
    nome: "Fernando Braide",
    logo: logoFernandoBraide,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/fernandobraide/",
  },
  {
    nome: "Formulare",
    logo: logoFormulare,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/formularemanipulados/",
  },
  {
    nome: "Olhar Saúde",
    logo: logoOlharSaude,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/clinicaolharsaude/",
  },
  {
    nome: "Ouro da Ilha",
    logo: logoOuroDaIlha,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/ourodailha/",
  },
  {
    nome: "Pulse Arena",
    logo: logoPulseArena,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/pulsearenas/",
  },
  {
    nome: "Verona",
    logo: logoVerona,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/",
  },
];

// ── Dados Prata ───────────────────────────────────────

export const patrocinadoresPrata: PatrocinadorPrata[] = [
  {
    nome: "ATAC Sistemas",
    logo: logoAtacSistemas,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/atacsistemas/",
  },
  {
    nome: "Casa Rolamentos",
    logo: logoCasaRolamentos,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/casadosrolamentos.slz/",
  },
  {
    nome: "Glow Pop",
    logo: logoGlowPop,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/",
  },
  {
    nome: "Matheus Fiquene - Imóveis Exclusivos",
    logo: logoMateusFiquene,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/matheusfiquene/",
  },
  {
    nome: "SAM Surgery",
    logo: logoSamSurgery,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/",
  },
  {
    nome: "SLBD Empreendimentos",
    logo: logoSlbd,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/gruposlbd/",
  },
  {
    nome: "Vitória Infraestrutura",
    logo: logoVitoriaInfra,
    descricao: "Parceiro da Incends Conference.",
    instagram: "https://www.instagram.com/",
  },
];

// ── Dados Bronze ──────────────────────────────────────

export const patrocinadoresBronze: PatrocinadorBronze[] = [
  { nome: "Apoiador 1", logo: logoBronze01 },
  { nome: "Florescer Pediatria", logo: logoBronze02 },
  { nome: "Apoiador 3", logo: logoBronze03 },
  { nome: "Projeto 4", logo: logoBronze04 },
  { nome: "Construlider", logo: logoBronze05 },
  { nome: "Apoiador 6", logo: logoBronze06 },
  { nome: "Apoiador 7", logo: logoBronze07 },
  { nome: "Apoiador 8", logo: logoBronze08 },
  { nome: "Apoiador 9", logo: logoBronze09 },
  { nome: "Rodrigo Arrais", logo: logoBronze10 },
  { nome: "Apoiador 11", logo: logoBronze11 },
  { nome: "Apoiador 12", logo: logoBronze12 },
  { nome: "Apoiador 13", logo: logoBronze13 },
  { nome: "Apoiador 14", logo: logoBronze14 },
  { nome: "Apoiador 15", logo: logoBronze15 },
  { nome: "Apoiador 16", logo: logoBronze16 },
  { nome: "Bone Imperial", logo: logoBronze17 },
  { nome: "Broker Nestlé", logo: logoBronze18 },
];
