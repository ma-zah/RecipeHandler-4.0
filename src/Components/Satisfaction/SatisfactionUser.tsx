import { Avatar, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'

import { User } from '../../model/model'
import { useUsersContext } from '../Provider/UsersProvider'
import SatisfactionIconContainer from './SatisfactionIconContainer'

const useStyles = makeStyles(() =>
    createStyles({
        avatar: {
            width: 50,
            height: 50,
            margin: '8px 0px',
        },
    })
)

interface Props extends Pick<RatingProps, 'value' | 'onChange' | 'disabled'> {
    uid: string
}

const SatisfactionUser = ({ uid, ...ratingProps }: Props) => {
    const { getByUid } = useUsersContext()
    const { username, profilePicture } = getByUid(uid) as User

    const classes = useStyles()

    return (
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
            <Grid item>
                <Avatar className={classes.avatar} src={profilePicture}>
                    {username.slice(0, 1)}
                </Avatar>
            </Grid>
            <Grid item zeroMinWidth>
                <Typography gutterBottom noWrap variant="subtitle1">
                    {username}{' '}
                </Typography>
                <Rating
                    {...ratingProps}
                    name="recipe-user-satisfaction"
                    size="large"
                    IconContainerComponent={SatisfactionIconContainer}
                />
            </Grid>
        </Grid>
    )
}

export default SatisfactionUser