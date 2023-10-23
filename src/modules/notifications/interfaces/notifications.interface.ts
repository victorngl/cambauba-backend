export interface IAgendaEduNotification {
      "notification": {
            student_external_id: string,
            student_can_see: boolean,
            send_to_all_responsibles: boolean,
            category: string;
            send_at: string;
            title: string;
            description: string;
            from: string;
      }
}