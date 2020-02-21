import { createStyles, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles(theme =>
    createStyles({
        icon: {
            zIndex: -1,
            opacity: theme.palette.type === 'dark' ? 0.4 : 0.6,
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            [theme.breakpoints.only('xs')]: {
                display: 'none',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
                width: 512,
            },
            [theme.breakpoints.only('xl')]: {
                width: 640,
            },
        },
    })
)

interface BackgroundIconProps {
    Icon: FC<React.SVGProps<SVGSVGElement>>
}

export const BackgroundIcon: FC<BackgroundIconProps> = ({ Icon }) => {
    const classes = useStyles()

    return <Icon className={classes.icon} />
}
