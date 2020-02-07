import { Box, createStyles, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import ThumbDownIcon from '@material-ui/icons/ThumbDownRounded'
import ThumbUpIcon from '@material-ui/icons/ThumbUpRounded'
import React, { memo } from 'react'

import { Comment as CommentModel, Recipe } from '../../model/model'
import { CommentsCollections } from '../../model/model'
import { FirebaseService } from '../../services/firebase'
import { BORDER_RADIUS_HUGE } from '../../theme'
import { BadgeWrapper } from '../Shared/BadgeWrapper'

const useStyles = makeStyles(theme =>
    createStyles({
        comment: {
            cursor: 'auto',
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(1),
            borderRadius: BORDER_RADIUS_HUGE,
            marginBottom: theme.spacing(0.5),
        },
    })
)

interface CommentProps extends Pick<Recipe, 'name'>, CommentsCollections {
    comment: CommentModel
}

const includesUrl = (value: string) => value.includes('http://') || value.includes('https://')

const getCommentTypography = (comment: string): React.ReactNode => {
    if (!includesUrl(comment)) return comment
    const complexComment: Array<any> = []

    comment.split(' ').forEach(value => {
        if (includesUrl(value))
            complexComment.push(
                <a href={value} target="_blank" rel="noopener noreferrer">
                    Link
                </a>
            )
        else complexComment.push(<>{value}</>)
    })

    return (
        <>
            {complexComment.map((value, index) => (
                <span key={index}>{value} </span>
            ))}
        </>
    )
}

const Comment = ({ comment, name, collection }: CommentProps) => {
    const classes = useStyles()

    const handleThumbClick = (
        documentId: string,
        type: keyof Pick<CommentModel, 'dislikes' | 'likes'>
    ) => () => {
        FirebaseService.firestore
            .collection(collection)
            .doc(name)
            .collection('comments')
            .doc(documentId)
            .update({ [type]: FirebaseService.incrementBy(1) })
    }

    return (
        <Grid item>
            <div className={classes.comment}>
                <Typography variant="caption">
                    {FirebaseService.createDateFromTimestamp(comment.createdDate).toLocaleString()}
                </Typography>
                <Typography>{getCommentTypography(comment.comment)}</Typography>
            </div>

            <Box marginBottom={1} display="flex" justifyContent="flex-end">
                <IconButton onClick={handleThumbClick(comment.documentId, 'likes')}>
                    <BadgeWrapper
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={comment.likes}>
                        <ThumbUpIcon />
                    </BadgeWrapper>
                </IconButton>
                <IconButton onClick={handleThumbClick(comment.documentId, 'dislikes')}>
                    <BadgeWrapper
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={comment.dislikes}>
                        <ThumbDownIcon />
                    </BadgeWrapper>
                </IconButton>
            </Box>
        </Grid>
    )
}

export default memo(
    Comment,
    (prev, next) =>
        prev.collection === next.collection &&
        prev.comment === next.comment &&
        prev.name === next.name
)
