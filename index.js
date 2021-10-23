function solution(record) {
    var answer = [];
    const ACTION_ENTER = 'Enter';
    const ACTION_LEAVE = 'Leave';
    const ACTION_CHANGE = 'Change';
    
    function changeUserNickName (uid, nickname) {
        answer.filter(function (user) {
            return user.uid === uid;
        }).forEach(function (user) {
            user.nickname = nickname;
        });
    }
    
    function logRecord (uid, nickname, msg) {
        answer.push({ uid: uid, nickname: nickname, msg: msg });
    }
    
    if (record.length > 100000) {
        throw new Error('Too many arguments.');
    }
    
    for (var k = 0; k < record.length; k++) {
        var inputs = record[k].split(' ');
        const act = inputs[0], uid = inputs[1], nic = inputs[2];
        
        if (uid.length > 10 || (nic && nic.length > 10)) {
            throw new Error('Too many characters.');
        }
        
        switch (act) {
            case ACTION_ENTER:
                logRecord(uid, nic, 'came in');
                changeUserNickName(uid, nic);
                break;
            case ACTION_CHANGE:
                changeUserNickName(uid, nic);
                break;
            case ACTION_LEAVE:
                const user = answer.find(function (user) {
                    return user.uid === uid;
                });
                logRecord(uid, user.nickname, 'has left');
                break;
            default: throw new Error('Invalid action given.');
        }
    }
    
    return answer.reduce(function (carry, item) {
        carry.push(`${item.nickname} ${item.msg}`);
        return carry;
    }, []);
}
