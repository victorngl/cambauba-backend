export interface IAgendaEduNotification {
      "notification": {
            student_profile_id: number,
            student_can_see: boolean,
            send_to_all_responsibles: boolean,
            responsible_profile_ids: [],
            category: string;
            send_at: string;
            title: string;
            description: string;
            from: string;
      }
}