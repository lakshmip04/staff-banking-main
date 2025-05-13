import LoanDetails from "@/components/loans/loan-details"

export default async function LoanDetailsPage({ params }: { params: { id: string } }) {
  return <LoanDetails loanId={params.id} />
}
