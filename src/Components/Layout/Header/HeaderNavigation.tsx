import { createStyles, Fab, IconButton, makeStyles, Tooltip, Zoom } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import BrightnessIcon from '@material-ui/icons/SettingsBrightnessOutlined'
import { LightbulbOutline } from 'mdi-material-ui'
import React, { memo } from 'react'

import { useFirebaseAuthContext } from '../../Provider/FirebaseAuthProvider'
import { Navigate } from '../../Routes/Navigate'
import { PATHS } from '../../Routes/Routes'
import { HeaderDispatch } from './HeaderReducer'

interface HeaderNavigationProps extends HeaderDispatch {
    onThemeChange: () => void
}
const useStyles = makeStyles(theme =>
    createStyles({
        container: {
            position: 'relative',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        addBtn: {
            position: 'absolute',
            top: -28,
            right: theme.spacing(3),
        },
    })
)

const HeaderNavigation = ({ dispatch, onThemeChange }: HeaderNavigationProps) => {
    const { user } = useFirebaseAuthContext()
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Navigate to={PATHS.home}>
                <Tooltip TransitionComponent={Zoom} title="Startseite">
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Tooltip>
            </Navigate>

            <Tooltip TransitionComponent={Zoom} title="Theme wechseln">
                <IconButton onClick={onThemeChange}>
                    <BrightnessIcon />
                </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Versuchskaninchen">
                <IconButton onClick={() => dispatch({ type: 'trialsChange' })}>
                    <LightbulbOutline />
                </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Einloggen">
                <IconButton onClick={() => dispatch({ type: 'dialogChange' })}>
                    <AccountIcon />
                </IconButton>
            </Tooltip>

            {user && !user.isAnonymous && (
                <div className={classes.addBtn}>
                    <Navigate to={PATHS.recipeCreate}>
                        <Fab color="secondary">
                            <AddIcon />
                        </Fab>
                    </Navigate>
                </div>
            )}
        </div>
    )
}

export default memo(HeaderNavigation)
