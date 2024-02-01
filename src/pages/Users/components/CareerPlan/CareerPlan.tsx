import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from "react";
import { UserSkill } from "../../../../models/users/userSkill.model";
import { FormatDate } from "../../../../utilities/format-date.utility";
import { sortByDate } from '../../../../utilities/sort.utility';
import './CareerPlan.css';

interface Props {
    skills: UserSkill[]
}

const CareerPlan: FC<Props> = ({ skills }) => {
    const [userSkills, setUserSkills] = useState<UserSkill[]>([]);

    useEffect(() => {
        setUserSkills(sortByDate(skills, 'learningDate'));
    }, [skills])

    return (
        <div className='container-timeline-career'>
            <Timeline position="alternate" >

                {
                    userSkills.map(skill => (
                        <TimelineItem key={skill.id + skill.level}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                {FormatDate(skill.learningDate)}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot className='container-logo'>
                                    <img className="logo-skill" src={skill.url} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    {skill.description}
                                </Typography>
                                <Typography> Nivel {skill.level}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }

            </Timeline>
        </div>
    )
}

export default CareerPlan