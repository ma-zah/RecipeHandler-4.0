import { List } from '@material-ui/core'
import BookIcon from '@material-ui/icons/SupervisedUserCircle'

import { useFirebaseAuthContext } from '@/Components/Provider/FirebaseAuthProvider'
import { useUsersContext } from '@/Components/Provider/UsersProvider'
import StyledCard from '@/Components/Shared/StyledCard'
import { User } from '@/model/model'

import AccountListItem from '../AccountListItem'
import { UserSettingChangeHandler } from './AccountUser'

interface Props {
  onUserSettingChange: UserSettingChangeHandler
}
// TODO FirebaseError: [code=invalid-argument]: Invalid Query. 'in' filters support a maximum of 10 elements in the value array
const AccountUserRecipes = ({ onUserSettingChange }: Props) => {
  const { userIds } = useUsersContext()
  const { user } = useFirebaseAuthContext() as { user: User }

  return (
    <StyledCard header="Rezepte von" BackgroundIcon={BookIcon}>
      <List>
        {userIds.map(id => (
          <AccountListItem
            key={id}
            uid={id}
            variant="user"
            checked={user.selectedUsers.some(selectedId => selectedId === id)}
            onChange={onUserSettingChange('selectedUsers')}
          />
        ))}
      </List>
    </StyledCard>
  )
}

export default AccountUserRecipes
