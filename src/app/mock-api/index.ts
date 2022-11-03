import { AcademyMockApi } from 'app/mock-api/apps/academy/api';
import { ActivitiesMockApi } from 'app/mock-api/pages/activities/api';
import { HomeMockApi } from 'app/mock-api/dashboards/home/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { ChatMockApi } from 'app/mock-api/apps/chat/api';
import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
import { MembersInventoryMockApi } from 'app/mock-api/apps/members/api';
import { ClubsInventoryMockApi } from 'app/mock-api/apps/clubs/api';
import { FileManagerMockApi } from 'app/mock-api/apps/file-manager/api';
import { HelpCenterMockApi } from 'app/mock-api/apps/help-center/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { MailboxMockApi } from 'app/mock-api/apps/mailbox/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotesMockApi } from 'app/mock-api/apps/notes/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { ScrumboardMockApi } from 'app/mock-api/apps/scrumboard/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { TasksMockApi } from 'app/mock-api/apps/tasks/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { ActivitiesInventoryMockApi } from './apps/activities/api';

export const mockApiServices = [
    AcademyMockApi,
    ActivitiesMockApi,
    HomeMockApi,
    AuthMockApi,
    ChatMockApi,
    ContactsMockApi,
    MembersInventoryMockApi,
    ClubsInventoryMockApi,
    ActivitiesInventoryMockApi,
    FileManagerMockApi,
    HelpCenterMockApi,
    IconsMockApi,
    MailboxMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotesMockApi,
    NotificationsMockApi,
    SearchMockApi,
    ScrumboardMockApi,
    ShortcutsMockApi,
    TasksMockApi,
    UserMockApi
];
