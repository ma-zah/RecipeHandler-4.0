import { createStyles, makeStyles } from '@material-ui/core'
import CameraIcon from '@material-ui/icons/CameraTwoTone'
import SpeedDialIcon from '@material-ui/icons/ClassRounded'
import EyeIcon from '@material-ui/icons/RemoveRedEyeTwoTone'
import SaveIcon from '@material-ui/icons/SaveTwoTone'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import React, { useState } from 'react'

import { DropzoneProps } from './Attachments/useAttachmentDropzone'

const useStyles = makeStyles(theme =>
    createStyles({
        speedDial: {
            zIndex: theme.zIndex.drawer + 1,
            position: 'fixed',
            right: theme.spacing(2),
            bottom: `calc(env(safe-area-inset-bottom) + ${theme.spacing(4.5)}px)`,
        },
    })
)

interface Props extends DropzoneProps {
    onRelated: () => void
    onPreview: () => void
    onSave: () => void
}

const RecipeCreateSpeedDial = ({ onRelated, onPreview, onSave, dropzoneProps }: Props) => {
    const [speedDialOpen, setSpeedDialOpen] = useState(false)
    const classes = useStyles()

    return (
        <SpeedDial
            className={classes.speedDial}
            FabProps={{ color: 'secondary' }}
            ariaLabel="recipe create speed dial"
            open={speedDialOpen}
            onOpen={() => setSpeedDialOpen(true)}
            onClose={() => setSpeedDialOpen(false)}
            icon={<SpeedDialIcon />}
            openIcon={<SpeedDialIcon />}>
            <SpeedDialAction
                {...dropzoneProps.getRootProps()}
                icon={
                    <>
                        <input {...dropzoneProps.getInputProps()} />
                        <CameraIcon />
                    </>
                }
                FabProps={{ size: 'medium' }}
                tooltipTitle="Bilder hinzufügen"
            />
            <SpeedDialAction
                onClick={onRelated}
                tooltipTitle="Passt gut zu bearbeiten"
                FabProps={{ size: 'medium' }}
                icon={<SwapIcon />}
            />
            <SpeedDialAction
                icon={<EyeIcon />}
                onClick={onPreview}
                tooltipTitle="Rezeptvorschau"
                FabProps={{ size: 'medium' }}
            />
            <SpeedDialAction
                icon={<SaveIcon />}
                onClick={onSave}
                tooltipTitle="Rezept speichern"
                FabProps={{ size: 'medium' }}
            />
        </SpeedDial>
    )
}

export default RecipeCreateSpeedDial