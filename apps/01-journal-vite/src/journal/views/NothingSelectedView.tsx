import { useTranslation } from 'react-i18next';

import { BcGrid, BcTypography, BcStarOutline } from '../../shared';

export const NothingSelectedView = () => {
    const { t } = useTranslation(['journal']);

    return (
        <BcGrid
            container
            className="animate__animated animate__fadeIn animate__faster"
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: 'calc(100vh - 110px)',
            }}
        >
            <BcGrid item xs={ 12 }>
                <BcStarOutline sx={{
                    fontSize: 100,
                    color: 'primary'
                }} />
            </BcGrid>
            <BcGrid item xs={ 12 }>
                <BcTypography variant='h5'>{t("Select or create a note")}</BcTypography>
            </BcGrid>
        </BcGrid>
    )
}
