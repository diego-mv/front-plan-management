import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Grid } from '@mui/material';
import { PRIVATE_ROUTES } from '../../AppRoutes';
import Breadcrumb from '../../components/Breadcrumb';
import { BreadCrumbItem } from '../../models/common/breadcrumbItem.model';
import './Skills.css';
import CreateSkill from './components/Create/CreateSkill';
import TableSkills from './components/TableSkills/TableSkills';
import { SkillProvider } from './contexts/SkillContext';

const Skills = () => {
  const breadItems: BreadCrumbItem[] = [
    {
      label: 'Home',
      url: PRIVATE_ROUTES.HOME
    },
    {
      label: 'Habilidades',
      url: PRIVATE_ROUTES.ADMIN_SKILLS,
      active: true
    },
  ];

  return (
    <div className="container">
      <Breadcrumb items={breadItems} />
      <h2 className="title"><AutoAwesomeIcon /> Habilidades</h2>
      <div className="content-skills">
        <SkillProvider
          skills={[]}
          chargeSkills={() => { }}
          addSkill={() => { }}
          removeSkill={() => { }}
        >
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <TableSkills></TableSkills>
            </Grid>
            <Grid item xs={6}>
              <CreateSkill></CreateSkill>
            </Grid>
          </Grid>
        </SkillProvider>
      </div>
    </div >
  )
}

export default Skills