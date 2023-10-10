import MEM from '../../../../../../../../../src/core';
export interface MEMInstance {
    MEM: MEM;
    loaders: {
        isReadLoading: boolean;
        isWriteLoading: boolean;
    };
}
