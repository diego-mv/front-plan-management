import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (

        <div className="footer">
            <div className='container-footer'>
                <p className='footer-text'>{t('careerPlanManager')}®</p>
            </div></div>
    )
}

export default Footer