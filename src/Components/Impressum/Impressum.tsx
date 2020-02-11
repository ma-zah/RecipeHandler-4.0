import { Grid, Link, ListSubheader, Typography } from '@material-ui/core'
import React from 'react'

import { useGridContext } from '../Provider/GridProvider'
import StyledCard from '../Shared/StyledCard'

const Impressum = () => {
    const { gridBreakpointProps } = useGridContext()

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h4">Impressum</Typography>
            </Grid>
            <Grid item {...gridBreakpointProps}>
                <StyledCard>
                    <ListSubheader disableGutters>Haftung für Inhalte</ListSubheader>
                    <Typography gutterBottom>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
                        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
                        TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
                        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </Typography>
                    <Typography>
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
                        nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
                        Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                        Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                        Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </Typography>
                </StyledCard>
            </Grid>
            <Grid item {...gridBreakpointProps}>
                <StyledCard>
                    <ListSubheader disableGutters>Haftung für Links</ListSubheader>
                    <Typography gutterBottom>
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
                        wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
                        keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                        jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
                        Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                        überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
                        erkennbar.
                    </Typography>
                    <Typography>
                        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                        konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                        Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
                        entfernen.
                    </Typography>
                </StyledCard>
            </Grid>
            <Grid item {...gridBreakpointProps}>
                <StyledCard>
                    <ListSubheader disableGutters>Urheberrecht</ListSubheader>
                    <Typography gutterBottom>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                        Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                        bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
                        privaten, nicht kommerziellen Gebrauch gestattet.
                    </Typography>
                    <Typography>
                        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
                        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
                        derartige Inhalte umgehend entfernen.
                    </Typography>
                </StyledCard>
            </Grid>
            <Grid item {...gridBreakpointProps}>
                <StyledCard>
                    <ListSubheader disableGutters>Angaben gemäß § 5 TMG</ListSubheader>
                    <Typography>Fabian Hinz</Typography>
                    <Typography>Wiggenhauser Weg 36</Typography>
                    <Typography>88046 Friedrichshafen</Typography>

                    <ListSubheader disableGutters>Kontakt</ListSubheader>
                    <Typography>Telefon: 017645824976</Typography>
                    <Typography>E-Mail: hinzfabian.fh@gmail.com</Typography>
                </StyledCard>
            </Grid>

            <Grid item xs={12}>
                <Typography align="center">
                    <i>
                        Icons made by{' '}
                        <Link href="https://www.flaticon.com/authors/freepik">Freepik</Link> and{' '}
                        <Link href="https://www.flaticon.com/authors/smashicons">Smashicons</Link>{' '}
                        from <Link href="https://www.flaticon.com/">www.flaticon.com</Link>
                    </i>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Impressum
