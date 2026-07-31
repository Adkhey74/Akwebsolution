import type { Metadata } from "next";
import {
  caseStudyMetadata,
  caseStudyParams,
  CaseStudyPage,
} from "@/components/pages/CaseStudyPage";

export function generateStaticParams() {
  return caseStudyParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata(slug, "en");
}

export default async function CaseStudyEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} locale="en" />;
}
