
interface Messagesend{
    msg ?: string ,
    RecieverEmail ?: string
}

export class MessageSend implements Messagesend
{
    constructor(
    public msg: string,
    public RecieverEmail: string 
    ){}

}