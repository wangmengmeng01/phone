import { middleClone } from '@/until'


const  root_state ={
  header: {
    channel: '3',
    platformType: '0',
    version: '5.0.0'
  },
  user: {
    invitation_code: '',
    mobile_phone: '',
  },
  message: {},
  visible: {
    pop: true,
    native_guide: true
  }
};

export default root_state

export const root_state_back = middleClone(root_state);
