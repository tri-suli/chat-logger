function chatLogger(record) {
    var log = [];
    const ACTION_ENTER = 'Enter';
    const ACTION_LEAVE = 'Leave';
    const ACTION_CHANGE = 'Change';
    
    function changeUserNickName (uid, nickname) {
        log.filter(function (user) {
            return user.uid === uid;
        }).forEach(function (user) {
            user.nickname = nickname;
        });
    }
    
    function logRecord (uid, nickname, msg) {
        log.push({ uid: uid, nickname: nickname, msg: msg });
    }
    
    for (var k = 0; k < record.length; k++) {
        var inputs = record[k].split(' ');
        const act = inputs[0], uid = inputs[1], nic = inputs[2];
        
        switch (act) {
            case ACTION_ENTER:
                logRecord(uid, nic, 'came in');
                changeUserNickName(uid, nic);
                break;
            case ACTION_CHANGE:
                changeUserNickName(uid, nic);
                break;
            case ACTION_LEAVE:
                const user = log.find(function (user) {
                    return user.uid === uid;
                });
                logRecord(uid, user.nickname, 'has left');
                break;
        }
    }
    
    return log.reduce(function (carry, item) {
        carry.push(`${item.nickname} ${item.msg}`);
        return carry;
    }, []);
}
