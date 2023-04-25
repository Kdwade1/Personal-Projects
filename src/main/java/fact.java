public class fact {

    public static long facto(long n){
        if(n <=1){
            return 1;
        }else{
            return n * facto(n-1);
        }
    }

    public static void main(String[] args) {
        System.out.println(facto(8));
    }
}
