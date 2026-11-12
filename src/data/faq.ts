export interface FaqItem {
  /** ページ内リンク用 ID（/apps/{app}/support/#{id}） */
  id: string;
  question: string;
  answer: string;
}

export const faq: Record<string, FaqItem[]> = {
  pawsteps: [
    {
      id: 'free',
      question: '本当に無料ですか？アカウント登録は必要ですか？',
      answer: 'アカウント登録は不要で、サブスクリプションやアプリ内課金もありません。App Storeからダウンロード後、ヘルスケア連携を許可すれば始められます。',
    },
    {
      id: 'steps',
      question: '歩数はどのように記録されますか？',
      answer: 'PawSteps はiPhoneのヘルスケア（HealthKit）に記録された歩数を読み取り、今日の歩数や時間帯別の進み具合を表示します。初回利用時にヘルスケアへのアクセスを許可してください。GPSによる散歩ルートの記録は行いません。',
    },
    {
      id: 'watch',
      question: 'Apple Watchがなくても使えますか？',
      answer: 'はい。PawStepsはiPhoneだけでご利用いただけます。Apple Watchをお持ちの場合は、Watchアプリや文字盤のコンプリケーションでも今日の歩数と連続達成日数を確認できます。',
    },
    {
      id: 'dogs',
      question: '犬キャラクターは有料ですか？',
      answer: 'いいえ。現在の10犬種はすべて無料で選べます。キャラクターを変更しても、アプリ全体の歩数やミッションの記録はそのまま引き継がれます。',
    },
    {
      id: 'transfer',
      question: '機種変更や再インストール時にデータは引き継がれますか？',
      answer: 'PawStepsのアプリ内データは現在、端末内に保存されます。アプリを削除すると、ミッション・連続達成・ごはん回数などの記録は復元できません。ヘルスケアに保存済みの歩数は、ヘルスケア側の移行状況に応じて再取得されます。',
    },
  ],
  picolle: [
    {
      id: 'share',
      question: '家族と作品を共有するには？',
      answer: '個展ごとの招待リンクを家族に送ると、一緒に作品を鑑賞できます。Freeプランでも1つの個展につき5人まで共有できます。',
    },
    {
      id: 'quality',
      question: '作品の画質はどのくらいですか？',
      answer: 'Freeプランでは長辺2048px（JPEG形式、最大2MB）の画質で保存されます。Premiumプラン（月額500円）にアップグレードすると、長辺4096pxの高画質で保存できます。撮影時はなるべく明るい場所で、作品が画面いっぱいに映るように撮影すると、きれいに仕上がります。',
    },
    {
      id: 'limits',
      question: '個展（コレクション）はいくつ作れますか？',
      answer: 'Freeプランでは、初回に3個の個展が利用でき、その後毎月1個ずつ増えます（上限10個）。Premiumプランでは最大50個の個展をすぐにご利用いただけます。各個展には、Freeプランで20作品、Premiumプランで100作品まで登録できます。',
    },
    {
      id: 'cancel',
      question: 'サブスクリプション（Premiumプラン）を解約するとどうなりますか？',
      answer: 'Premiumプランを解約すると、現在の課金期間の終了後にFreeプランに戻ります。Freeプランの上限を超えている個展や作品はロックされますが、データが削除されることはありません。再度Premiumプランにご登録いただくと、すべてのデータに再びアクセスできます。サブスクリプションの管理は、iOSの「設定」アプリ > Apple ID > サブスクリプションから行えます。',
    },
    {
      id: 'transfer',
      question: '機種変更時にデータは引き継げますか？',
      answer: 'はい、引き継げます。Picolle. のデータはクラウド上に保存されているため、新しい端末で同じApple IDを使ってサインインすれば、すべてのデータ（お子さまの情報、作品、個展など）が自動的に引き継がれます。特別な操作やバックアップは不要です。',
    },
    {
      id: 'delete',
      question: 'アカウントを削除するとどうなりますか？',
      answer: 'アカウントを削除すると、登録されているすべてのデータ（お子さまの情報、作品、個展、共有設定など）が完全に削除されます。削除後のデータの復元はできませんので、必要な作品はあらかじめ端末に保存してからアカウントを削除してください。アカウントの削除は、アプリ内の「設定」画面から行えます。',
    },
  ],
};

/** FAQPage 構造化データ */
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
