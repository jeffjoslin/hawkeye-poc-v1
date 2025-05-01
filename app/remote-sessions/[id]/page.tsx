import SessionDetailPage from "@/components/kokonutui/remote-sessions/session-detail-page"

export default function SessionDetail({ params }: { params: { id: string } }) {
  return <SessionDetailPage sessionId={params.id} />
}
