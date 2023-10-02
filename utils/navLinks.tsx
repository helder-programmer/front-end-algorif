import TaskIcon from '@mui/icons-material/Task';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GroupIcon from '@mui/icons-material/Group';

import { ChartBar as ChartBarIcon } from '../src/icons/chartBar';
import { Cog as CogIcon } from '../src/icons/cog';
import { User as UserIcon } from '../src/icons/user';

export function getNavLinks(isTeacher: boolean) {
    const navLinks = [
        {
            href: '/',
            icon: (<ChartBarIcon fontSize="small" />),
            title: 'Painel inicial'
        },
        {
            href: '/account',
            icon: (<UserIcon fontSize="small" />),
            title: 'Perfil'
        },
        {
            href: '/questions',
            icon: (<TaskIcon fontSize="small" />),
            title: 'Exercícios'
        },
        {
            href: '/classStudents',
            icon: (<GroupIcon fontSize="small" />),
            title: 'Turmas'
        },
        {
            href: '/settings',
            icon: (<CogIcon fontSize="small" />),
            title: 'Configurações'
        },
    ];
    if (isTeacher) {
        navLinks.push({
            href: '/createQuestion',
            icon: (<AddTaskIcon fontSize="small" />),
            title: 'Criar Questão'
        });
    }
    return navLinks;
}